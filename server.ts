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

// Helper to sanitize environment variables (removes whitespace and quotes)
const sanitizeEnv = (val: string | undefined) => {
  if (!val) return val;
  return val.trim().replace(/^["']|["']$/g, "");
};

// M-Pesa Access Token Helper
async function getMpesaAccessToken() {
  const consumerKey = sanitizeEnv(process.env.MPESA_CONSUMER_KEY);
  const consumerSecret = sanitizeEnv(process.env.MPESA_CONSUMER_SECRET);
  const shortCode = sanitizeEnv(process.env.MPESA_SHORTCODE) || "174379";
  
  // Robust environment detection
  let env = sanitizeEnv(process.env.MPESA_ENVIRONMENT)?.toLowerCase();
  if (!env) {
    env = shortCode === "174379" ? "sandbox" : "production";
  }
  
  if (!consumerKey || !consumerSecret) {
    throw new Error("M-Pesa credentials missing (MPESA_CONSUMER_KEY/SECRET)");
  }

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`, 'utf-8').toString("base64");
  
  const isProduction = env === "production";
  const url = isProduction 
    ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  
  console.log(`[M-Pesa] Fetching token from ${isProduction ? 'Production' : 'Sandbox'} URL...`);
  
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    return response.data.access_token;
  } catch (error: any) {
    const errorData = error.response?.data || error.message;
    console.error("[M-Pesa] Token Error:", errorData);
    throw new Error(`Failed to get M-Pesa access token: ${JSON.stringify(errorData)}`);
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
      const shortCode = sanitizeEnv(process.env.MPESA_SHORTCODE) || "174379";
      let passKey = sanitizeEnv(process.env.MPESA_PASSKEY);
      const callbackUrl = sanitizeEnv(process.env.MPESA_CALLBACK_URL);
      
      let env = sanitizeEnv(process.env.MPESA_ENVIRONMENT)?.toLowerCase();
      if (!env) {
        env = shortCode === "174379" ? "sandbox" : "production";
      }
      
      // Fallback for sandbox passkey if missing or using default test shortcode
      if (shortCode === "174379" && (!passKey || passKey.length < 10)) {
        console.log("[M-Pesa] Using default sandbox PassKey for shortcode 174379");
        passKey = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
      }

      if (!passKey) {
        console.error("[M-Pesa] Configuration Missing: MPESA_PASSKEY is required for STK Push");
        return res.status(500).json({ error: "M-Pesa configuration missing (MPESA_PASSKEY)" });
      }

      if (!callbackUrl) {
        console.error("[M-Pesa] Configuration Missing: MPESA_CALLBACK_URL is required");
        return res.status(500).json({ error: "M-Pesa configuration missing (MPESA_CALLBACK_URL)" });
      }

      // Generate Timestamp (YYYYMMDDHHMMSS)
      // We'll use local time as it's often more reliable with Safaricom's EAT servers
      const date = new Date();
      // Add 3 hours to UTC to get EAT (East African Time) which Safaricom uses
      const eatDate = new Date(date.getTime() + (3 * 60 * 60 * 1000));
      
      const timestamp = 
        eatDate.getUTCFullYear().toString() +
        (eatDate.getUTCMonth() + 1).toString().padStart(2, '0') +
        eatDate.getUTCDate().toString().padStart(2, '0') +
        eatDate.getUTCHours().toString().padStart(2, '0') +
        eatDate.getUTCMinutes().toString().padStart(2, '0') +
        eatDate.getUTCSeconds().toString().padStart(2, '0');

      // Password = base64(ShortCode + PassKey + Timestamp)
      const password = Buffer.from(`${shortCode}${passKey}${timestamp}`, 'utf-8').toString("base64");

      // Format phone number to 254XXXXXXXXX
      let formattedPhone = phone.replace(/\D/g, "");
      if (formattedPhone.startsWith("0")) {
        formattedPhone = "254" + formattedPhone.slice(1);
      } else if (formattedPhone.startsWith("+254")) {
        formattedPhone = formattedPhone.slice(1);
      } else if (formattedPhone.startsWith("254")) {
        // Already correct
      } else if (formattedPhone.length === 9) {
        formattedPhone = "254" + formattedPhone;
      }

      const isProduction = env === "production";
      const pushUrl = isProduction
        ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

      // Determine TransactionType
      let transactionType = sanitizeEnv(process.env.MPESA_TRANSACTION_TYPE);
      if (!transactionType) {
        transactionType = "CustomerPayBillOnline";
      }
      
      // Force Paybill for sandbox test shortcode
      if (shortCode === "174379") {
        transactionType = "CustomerPayBillOnline";
      }

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
        AccountReference: orderId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12) || "Order",
        TransactionDesc: "Payment",
      };

      console.log(`[M-Pesa] Initiating STK Push to: ${pushUrl} (${env} mode)`);
      console.log(`[M-Pesa] Request Params: { ShortCode: ${shortCode}, Type: ${transactionType}, Phone: ${formattedPhone}, Timestamp: ${timestamp} }`);
      
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

      console.log("[M-Pesa] Safaricom STK Push Response:", pushResponse.data);

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
          console.log(`[M-Pesa] SUCCESS: Payment verified for Order ${orderId}. Notifying staff...`);
          order.paymentStatus = 'paid';
          order.mpesaReceiptNumber = Body.stkCallback.CallbackMetadata?.Item?.find((i: any) => i.Name === 'MpesaReceiptNumber')?.Value;
          
          await sendOrderEmail(order);
          // We keep the order for a bit so the frontend can query it
          setTimeout(() => {
            orders.delete(orderId);
            paymentToOrder.delete(CheckoutRequestID);
          }, 1000 * 60 * 5); // Delete after 5 minutes
        } else {
          console.error(`[M-Pesa] Order ${orderId} not found in memory for successful payment`);
        }
      } else {
        console.error(`[M-Pesa] CheckoutRequestID ${CheckoutRequestID} not found in mapping`);
      }
    } else {
      // Payment Failed or Cancelled
      console.log(`[M-Pesa] FAILED: ${ResultDesc}`);
      const orderId = paymentToOrder.get(CheckoutRequestID);
      if (orderId) {
        const order = orders.get(orderId);
        if (order) {
          order.paymentStatus = 'failed';
          order.paymentError = ResultDesc;
        }
        // Clean up mapping but keep order for status check
        setTimeout(() => paymentToOrder.delete(CheckoutRequestID), 1000 * 60);
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

  // M-Pesa Status Query Route (Manual Query to Safaricom)
  app.get("/api/mpesa/query/:checkoutRequestId", async (req, res) => {
    const { checkoutRequestId } = req.params;
    
    try {
      const accessToken = await getMpesaAccessToken();
      const shortCode = process.env.MPESA_SHORTCODE?.trim() || "174379";
      const passKey = process.env.MPESA_PASSKEY?.trim();
      
      let env = process.env.MPESA_ENVIRONMENT?.trim().toLowerCase();
      if (!env) {
        env = shortCode === "174379" ? "sandbox" : "production";
      }

      const date = new Date();
      const timestamp = 
        date.getFullYear().toString() +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        date.getDate().toString().padStart(2, '0') +
        date.getHours().toString().padStart(2, '0') +
        date.getMinutes().toString().padStart(2, '0') +
        date.getSeconds().toString().padStart(2, '0');

      const password = Buffer.from(`${shortCode}${passKey}${timestamp}`).toString("base64");

      const queryUrl = env === "production"
        ? "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query"
        : "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";

      const queryResponse = await axios.post(
        queryUrl,
        {
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timestamp,
          CheckoutRequestID: checkoutRequestId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.status(200).json(queryResponse.data);
    } catch (error: any) {
      const errorData = error.response?.data || error.message;
      return res.status(500).json({ error: "Failed to query M-Pesa status", details: errorData });
    }
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
