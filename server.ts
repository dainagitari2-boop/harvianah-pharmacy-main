import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
      // This ensures the user sees the "Success" screen even if the email delivery fails in the background
      return res.status(200).json({ message: "Booking received successfully" });
    } catch (error: any) {
      console.error("Unexpected error in booking process:", error);
      return res.status(500).json({ error: "An unexpected error occurred. Please try again later." });
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
