import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

// In-memory storage for orders and payment mappings (for demo purposes)
const orders = new Map<string, any>();
const paymentToOrder = new Map<string, string>();

// M-Pesa Access Token Helper
async function getMpesaAccessToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const shortCode = process.env.MPESA_SHORTCODE || "174379";
  const env = process.env.MPESA_ENVIRONMENT || (shortCode === "174379" ? "sandbox" : "production");
  
  if (!consumerKey || !consumerSecret) {
    throw new Error("M-Pesa credentials missing (MPESA_CONSUMER_KEY/SECRET)");
  }

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");
  
  const isProduction = env === "production";
  const url = isProduction 
    ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  
  console.log(`Fetching M-Pesa token from ${isProduction ? 'Production' : 'Sandbox'} URL...`);
  
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return response.data.access_token;
  } catch (error: any) {
    console.error("M-Pesa Token Error:", error.response?.data || error.message);
    throw new Error(`Failed to get M-Pesa access token: ${JSON.stringify(error.response?.data || error.message)}`);
  }
}

// Helper to send order email to staff
async function sendOrderEmail(order: any) {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const itemsList = order.items.map((item: any) => 
      `- ${item.product.name} (x${item.quantity}) - KES ${(item.product.price * item.quantity).toLocaleString()}`
    ).join('\n');

    const itemsHtml = order.items.map((item: any) => `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${item.product.name}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: center;">x${item.quantity}</td>
        <td style="padding: 8px 0; border-bottom: 1px solid #eee; text-align: right;">KES ${(item.product.price * item.quantity).toLocaleString()}</td>
      </tr>
    `).join('');

    const mailOptions = {
      from: `"Harvianah Orders" <${process.env.EMAIL_USER}>`,
      to: "dainagitari2@gmail.com",
      subject: `PAID Order Received from ${order.name}`,
      text: `
        New PAID Order Received!
        
        Customer Details:
        - Name: ${order.name}
        - Phone: ${order.phone}
        - Delivery Location: ${order.location}
        
        Order Summary:
        ${itemsList}
        
        Total Amount: KES ${order.total.toLocaleString()}
        Payment Status: VERIFIED (M-Pesa)
        
        ---
        This email was sent from the Harvianah Pharmacy Order System.
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #EFF5D2; border-radius: 16px; overflow: hidden;">
          <div style="background-color: #8FA31E; padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New PAID Order Received</h1>
          </div>
          <div style="padding: 32px; background-color: white;">
            <div style="background-color: #e6ffed; border: 1px solid #b7eb8f; padding: 12px; border-radius: 8px; margin-bottom: 24px; color: #135200; font-weight: bold; text-align: center;">
              Payment Verified via M-Pesa
            </div>
            <h2 style="color: #556B2F; margin-top: 0;">Customer Details</h2>
            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Location:</strong> ${order.location}</p>
            
            <h2 style="color: #556B2F; margin-top: 24px;">Order Summary</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #8FA31E;">
                  <th style="text-align: left; padding-bottom: 8px;">Item</th>
                  <th style="text-align: center; padding-bottom: 8px;">Qty</th>
                  <th style="text-align: right; padding-bottom: 8px;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding-top: 16px; font-weight: bold; font-size: 18px;">Total</td>
                  <td style="padding-top: 16px; font-weight: bold; font-size: 18px; text-align: right; color: #8FA31E;">KES ${order.total.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div style="background-color: #F9F8F6; padding: 16px; text-align: center; font-size: 12px; color: #999;">
            &copy; ${new Date().getFullYear()} Harvianah Pharmacy. All rights reserved.
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Order notification sent for order from ${order.name}`);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // M-Pesa STK Push Route
  app.post("/api/mpesa/stk-push", async (req, res) => {
    console.log("STK Push Request Body:", req.body);
    const { phone, amount, orderId } = req.body;

    // Explicitly check for missing or invalid fields
    if (!phone || amount === undefined || amount === null || !orderId) {
      console.error("STK Push Validation Failed: Missing fields", { phone, amount, orderId });
      return res.status(400).json({ error: "Phone, amount, and orderId are required" });
    }

    if (Number(amount) <= 0) {
      console.error("STK Push Validation Failed: Invalid amount", amount);
      return res.status(400).json({ error: "Amount must be at least 1 KES" });
    }

    try {
      const accessToken = await getMpesaAccessToken();
      const shortCode = process.env.MPESA_SHORTCODE || "174379";
      const passKey = process.env.MPESA_PASSKEY;
      const callbackUrl = process.env.MPESA_CALLBACK_URL;
      const env = process.env.MPESA_ENVIRONMENT || (shortCode === "174379" ? "sandbox" : "production");
      
      if (!passKey || !callbackUrl) {
        console.error("M-Pesa Configuration Missing: PASSKEY or CALLBACK_URL");
        return res.status(500).json({ error: "M-Pesa configuration missing (PASSKEY/CALLBACK_URL)" });
      }

      const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, "").slice(0, 14);
      const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString("base64");

      // Format phone number to 254XXXXXXXXX
      let formattedPhone = phone.replace(/\D/g, "");
      if (formattedPhone.startsWith("0")) {
        formattedPhone = "254" + formattedPhone.slice(1);
      } else if (formattedPhone.startsWith("254")) {
        // Already correct
      } else if (formattedPhone.length === 9) {
        formattedPhone = "254" + formattedPhone;
      }

      const isProduction = env === "production";
      const pushUrl = isProduction
        ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

      // Determine TransactionType: CustomerPayBillOnline for Paybill, CustomerBuyGoodsOnline for Till
      // Sandbox 174379 is a Paybill.
      // For production, we'll try to guess or default to Paybill.
      const transactionType = isProduction && shortCode.length >= 6 ? "CustomerBuyGoodsOnline" : "CustomerPayBillOnline";

      const stkPushData = {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: transactionType,
        Amount: Math.max(1, Math.round(Number(amount))),
        PartyA: formattedPhone,
        PartyB: shortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: callbackUrl,
        AccountReference: orderId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12),
        TransactionDesc: "Payment",
      };

      console.log(`Initiating STK Push to: ${pushUrl} (${env} mode)`);
      console.log("STK Push Data:", { ...stkPushData, Password: "REDACTED" });

      const pushResponse = await axios.post(
        pushUrl,
        stkPushData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Safaricom STK Push Response:", pushResponse.data);

      // Map the CheckoutRequestID to the orderId so we can find it in the callback
      if (pushResponse.data.CheckoutRequestID) {
        paymentToOrder.set(pushResponse.data.CheckoutRequestID, orderId);
        console.log(`Mapped CheckoutRequestID ${pushResponse.data.CheckoutRequestID} to Order ${orderId}`);
      }

      return res.status(200).json(pushResponse.data);
    } catch (error: any) {
      const errorData = error.response?.data || error.message;
      console.error("STK Push Error:", JSON.stringify(errorData, null, 2));
      return res.status(500).json({ 
        error: "Failed to initiate M-Pesa payment", 
        details: errorData 
      });
    }
  });

  // M-Pesa Callback Route
  app.post("/api/mpesa/callback", async (req, res) => {
    const { Body } = req.body;
    
    if (!Body || !Body.stkCallback) {
      console.warn("Invalid M-Pesa callback received");
      return res.status(400).json({ ResultCode: 1, ResultDesc: "Invalid payload" });
    }

    const { ResultCode, ResultDesc, CheckoutRequestID } = Body.stkCallback;

    console.log(`M-Pesa Callback [${CheckoutRequestID}]: ${ResultDesc} (Code: ${ResultCode})`);

    if (ResultCode === 0) {
      // Payment Successful
      const orderId = paymentToOrder.get(CheckoutRequestID);
      if (orderId) {
        const order = orders.get(orderId);
        if (order) {
          console.log(`SUCCESS: Payment verified for Order ${orderId}. Notifying staff...`);
          await sendOrderEmail(order);
          // Clean up
          orders.delete(orderId);
          paymentToOrder.delete(CheckoutRequestID);
        } else {
          console.error(`Order ${orderId} not found in memory for successful payment`);
        }
      } else {
        console.error(`CheckoutRequestID ${CheckoutRequestID} not found in mapping`);
      }
    } else {
      // Payment Failed or Cancelled
      console.log(`FAILED: ${ResultDesc}`);
      const orderId = paymentToOrder.get(CheckoutRequestID);
      if (orderId) {
        paymentToOrder.delete(CheckoutRequestID);
        // We might want to keep the order in memory for a retry, or delete it
      }
    }

    return res.status(200).json({ ResultCode: 0, ResultDesc: "Success" });
  });

  // API Route for Consultation Booking
  app.post("/api/book-consultation", async (req, res) => {
    console.log("Received booking request:", req.body);
    const { name, email, phone, type, date, time, message } = req.body;

    // Validate input
    if (!name || !email || !type) {
      console.error("Validation failed: Missing required fields");
      return res.status(400).json({ error: "Missing required fields (name, email, and type are required)" });
    }

    try {
      // Log the booking details regardless of email status
      console.log("Processing booking for:", name);

      // Only attempt to send if credentials are provided
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        console.log("Attempting to send email via Nodemailer...");
        
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `"Harvianah Consultation" <${process.env.EMAIL_USER}>`,
          to: "dainagitari2@gmail.com",
          subject: `New Consultation Booking: ${name}`,
          text: `
            New Consultation Request Received:
            
            Client Details:
            - Name: ${name}
            - Email: ${email}
            - Phone: ${phone || 'Not provided'}
            
            Booking Details:
            - Consultation Type: ${type}
            - Preferred Date: ${date || 'Not specified'}
            - Preferred Time: ${time || 'Not specified'}
            
            Message/Notes:
            ${message || 'No additional notes provided.'}
            
            ---
            This email was sent from the Harvianah Pharmacy Consultation Booking System.
          `,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #EFF5D2; border-radius: 16px; overflow: hidden;">
              <div style="background-color: #8FA31E; padding: 24px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">New Consultation Request</h1>
              </div>
              <div style="padding: 32px; background-color: white;">
                <h2 style="color: #556B2F; margin-top: 0;">Client Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #556B2F; font-weight: bold; width: 120px;">Name:</td>
                    <td style="padding: 8px 0; color: #333;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #556B2F; font-weight: bold;">Email:</td>
                    <td style="padding: 8px 0; color: #333;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #556B2F; font-weight: bold;">Phone:</td>
                    <td style="padding: 8px 0; color: #333;">${phone || 'Not provided'}</td>
                  </tr>
                </table>
                
                <h2 style="color: #556B2F; margin-top: 24px;">Booking Details</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #556B2F; font-weight: bold; width: 120px;">Type:</td>
                    <td style="padding: 8px 0; color: #333;">${type}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #556B2F; font-weight: bold;">Date:</td>
                    <td style="padding: 8px 0; color: #333;">${date || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #556B2F; font-weight: bold;">Time:</td>
                    <td style="padding: 8px 0; color: #333;">${time || 'Not specified'}</td>
                  </tr>
                </table>
                
                <h2 style="color: #556B2F; margin-top: 24px;">Message/Notes</h2>
                <div style="padding: 16px; background-color: #EFF5D2; border-radius: 8px; color: #333; line-height: 1.6;">
                  ${message || 'No additional notes provided.'}
                </div>
              </div>
              <div style="background-color: #F9F8F6; padding: 16px; text-align: center; font-size: 12px; color: #999;">
                &copy; ${new Date().getFullYear()} Harvianah Pharmacy. All rights reserved.
              </div>
            </div>
          `
        };

        // Send email asynchronously so we don't block the response
        transporter.sendMail(mailOptions).then(() => {
          console.log("Email sent successfully to dainagitari2@gmail.com");
        }).catch((err) => {
          console.error("CRITICAL: Email delivery failed. This is likely due to invalid EMAIL_USER or EMAIL_PASS (App Password).");
          console.error("Nodemailer Error Details:", err.message);
        });
      } else {
        console.warn("Email credentials not provided (EMAIL_USER/EMAIL_PASS). Email skipped.");
      }

      // Always return success to the client if we reached this point
      return res.status(200).json({ message: "Booking received successfully" });
    } catch (error: any) {
      console.error("Unexpected error in booking process:", error);
      return res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
    }
  });

  // API Route for Order Placement
  app.post("/api/place-order", async (req, res) => {
    console.log("Received order request:", req.body);
    const { name, phone, location, items, total } = req.body;

    if (!name || !phone || !location || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields for order" });
    }

    const orderId = `HV-${Math.floor(10000 + Math.random() * 90000)}`;
    
    // Store order in memory until payment is confirmed
    orders.set(orderId, { 
      name, 
      phone, 
      location, 
      items, 
      total, 
      orderId, 
      status: 'pending',
      paymentStatus: 'unpaid',
      createdAt: new Date().toISOString()
    });
    console.log(`Order ${orderId} stored in memory. Awaiting payment.`);

    return res.status(200).json({ message: "Order placed, awaiting payment", orderId });
  });

  // API Route to get order details
  app.get("/api/order/:orderId", (req, res) => {
    const { orderId } = req.params;
    const order = orders.get(orderId);
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    return res.status(200).json(order);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
