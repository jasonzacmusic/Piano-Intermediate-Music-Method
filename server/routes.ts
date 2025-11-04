import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { google } from "googleapis";
import { Resend } from "resend";
import { courseBuilderFormSchema, type CourseBuilderForm } from "@shared/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

async function saveToGoogleSheets(data: CourseBuilderForm) {
  try {
    let privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY || '';
    
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1);
    }
    
    privateKey = privateKey.replace(/\\n/g, '\n');

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '16BNZdshYZC-SeG2Yar1pzM1ggQu2k9Y73U_CGlCYDck';

    const row = [
      new Date().toISOString(),
      data.name,
      data.email,
      `${data.countryCode} ${data.whatsappNumber}`,
      data.city,
      data.country,
      data.signupFor,
      data.learningGoals.join(', '),
      data.preferredGenre.join(', '),
      data.musicBackground,
      data.pianoExperience.join(', ') + (data.pianoExperienceOther ? ` - ${data.pianoExperienceOther}` : ''),
      data.classInterests.join(', '),
      data.preferredCallTime,
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Intermediate!A:M',
      valueInputOption: 'RAW',
      requestBody: {
        values: [row],
      },
    });

    console.log('[COURSE-BUILDER] Successfully saved to Google Sheets');
  } catch (error) {
    console.error('[COURSE-BUILDER] Google Sheets error:', error);
    throw new Error('Failed to save to Google Sheets');
  }
}

async function sendEmailNotifications(data: CourseBuilderForm) {
  try {
    const firstName = data.name.split(' ')[0];

    const adminEmailHtml = `
      <p>A new enquiry has been submitted for the Intermediate Course.</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>WhatsApp:</strong> ${data.countryCode} ${data.whatsappNumber}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Classes Selected:</strong> ${data.classInterests.join(', ')}</p>
      <p>The full form response is available in the Google Sheet: NSM Website - Form Responses &gt; Intermediate</p>
    `;

    const userEmailHtml = `
      <p>Hi ${firstName},</p>
      <p>Thank you for filling out the form! We've received your details and our team will reach out to you shortly via WhatsApp or phone at ${data.countryCode} ${data.whatsappNumber}.</p>
      <h3>What's Next?</h3>
      <ul>
        <li>Our team will contact you within 24 hours</li>
        <li>We'll discuss the course structure and answer any questions</li>
        <li>You can choose between Online, Offline (Bangalore), or Hybrid modes</li>
      </ul>
      <p>If you have any immediate questions, feel free to reach out to us:</p>
      <p>Email: music@nathanielschool.com<br/>WhatsApp: +91 77604 56847</p>
      <p>Looking forward to helping you begin your musical journey!</p>
      <p>— Nathaniel School of Music</p>
    `;

    await Promise.all([
      resend.emails.send({
        from: 'Nathaniel School of Music <onboarding@resend.dev>',
        to: ['music@nathanielschool.com'],
        subject: `New Intermediate Course Enquiry`,
        html: adminEmailHtml,
      }),
      resend.emails.send({
        from: 'Nathaniel School of Music <onboarding@resend.dev>',
        to: [data.email],
        subject: 'Thank you for reaching out to Nathaniel School of Music',
        html: userEmailHtml,
      }),
    ]);

    console.log('[COURSE-BUILDER] Successfully sent email notifications');
  } catch (error) {
    console.error('[COURSE-BUILDER] Email error:', error);
    throw new Error('Failed to send email notifications');
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/geo", async (req: Request, res) => {
    try {
      // First check for country headers from CDN/hosting providers
      let country = req.headers["x-vercel-ip-country"] as string || 
                   req.headers["cf-ipcountry"] as string ||
                   req.headers["x-replit-user-ip-country"] as string;
      
      // If no header available, extract IP and use geolocation API
      if (!country) {
        // Extract real client IP from x-forwarded-for (first IP is the client)
        const forwardedFor = req.headers["x-forwarded-for"] as string;
        const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : req.ip;
        
        console.log(`[GEO] No country header, looking up IP: ${clientIp}`);
        
        // Use free ip-api.com service for geolocation (no key needed, 45 req/min limit)
        // Falls back to ipapi.co if first service fails
        try {
          const geoResponse = await fetch(`http://ip-api.com/json/${clientIp}?fields=status,countryCode`);
          const geoData = await geoResponse.json();
          
          if (geoData.status === 'success' && geoData.countryCode) {
            country = geoData.countryCode;
            console.log(`[GEO] IP lookup success: ${clientIp} -> ${country}`);
          } else {
            throw new Error('ip-api.com failed');
          }
        } catch (error) {
          console.log(`[GEO] ip-api.com failed, trying ipapi.co`);
          try {
            const backupResponse = await fetch(`https://ipapi.co/${clientIp}/country_code/`);
            country = (await backupResponse.text()).trim();
            console.log(`[GEO] ipapi.co success: ${clientIp} -> ${country}`);
          } catch (backupError) {
            console.error(`[GEO] Both geolocation services failed, defaulting to international`);
            country = "US"; // Default to international (US) instead of India
          }
        }
      }
      
      const domesticCountries = [
        "IN", // India
        "NP", // Nepal
        "LK", // Sri Lanka
        "BD", // Bangladesh
        "PK", // Pakistan
        "BT", // Bhutan
        "MV"  // Maldives
      ];

      const region = domesticCountries.includes(country.toUpperCase()) 
        ? "domestic" 
        : "international";

      console.log(`[GEO] Final result - Country: ${country}, Region: ${region}`);

      res.json({
        country,
        region
      });
    } catch (error) {
      console.error('[GEO] Error in geo endpoint:', error);
      // On error, default to international pricing
      res.json({
        country: "US",
        region: "international"
      });
    }
  });

  app.post("/api/course-builder", async (req: Request, res) => {
    try {
      const validatedData = courseBuilderFormSchema.parse(req.body);

      await Promise.all([
        saveToGoogleSheets(validatedData),
        sendEmailNotifications(validatedData),
      ]);

      res.json({ success: true });
    } catch (error: any) {
      console.error('[COURSE-BUILDER] Error:', error);
      
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          error: "Invalid form data. Please check your inputs and try again." 
        });
      }
      
      res.status(500).json({ 
        error: error.message || "An unexpected error occurred. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
