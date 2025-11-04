import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { google } from "googleapis";
import { Resend } from "resend";
import { courseBuilderFormSchema, type CourseBuilderForm } from "@shared/schema";

const resend = new Resend(process.env.RESEND_API_KEY);

async function saveToGoogleSheets(data: CourseBuilderForm) {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1GlVEfh-eQI2Y6C69WFH1T7Vm2RM6uaWMT3XhF6_Ct-E';

    const row = [
      new Date().toISOString(),
      data.name,
      data.email,
      `${data.countryCode} ${data.phone}`,
      data.signupFor,
      data.childAge || '',
      data.learningGoals.join(', '),
      data.preferredGenre.join(', '),
      data.musicBackground,
      data.pianoExperience,
      data.classInterests.join(', '),
      data.preferredCallTime,
      data.additionalNotes || '',
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:M',
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
    const adminEmailHtml = `
      <h2>New Course Builder Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.countryCode} ${data.phone}</p>
      <p><strong>Signing up for:</strong> ${data.signupFor}</p>
      ${data.childAge ? `<p><strong>Child's Age:</strong> ${data.childAge}</p>` : ''}
      <p><strong>Learning Goals:</strong> ${data.learningGoals.join(', ')}</p>
      <p><strong>Preferred Genre:</strong> ${data.preferredGenre.join(', ')}</p>
      <p><strong>Music Background:</strong> ${data.musicBackground}</p>
      <p><strong>Piano Experience:</strong> ${data.pianoExperience}</p>
      <p><strong>Class Interests:</strong> ${data.classInterests.join(', ')}</p>
      <p><strong>Preferred Call Time:</strong> ${data.preferredCallTime}</p>
      ${data.additionalNotes ? `<p><strong>Additional Notes:</strong> ${data.additionalNotes}</p>` : ''}
    `;

    const userEmailHtml = `
      <h2>Thank you for your interest in Nathaniel School of Music!</h2>
      <p>Dear ${data.name},</p>
      <p>We've received your course preferences and our team will contact you shortly at ${data.countryCode} ${data.phone} during your preferred time: ${data.preferredCallTime}.</p>
      <p>In the meantime, feel free to explore our YouTube channel for free tutorials and teaching demonstrations.</p>
      <p>Best regards,<br/>Nathaniel School of Music Team</p>
    `;

    await Promise.all([
      resend.emails.send({
        from: 'NSM Course Builder <onboarding@resend.dev>',
        to: ['music@nathanielschool.com'],
        subject: `New Course Builder: ${data.name}`,
        html: adminEmailHtml,
      }),
      resend.emails.send({
        from: 'Nathaniel School of Music <onboarding@resend.dev>',
        to: [data.email],
        subject: 'Your Course Preferences - Nathaniel School of Music',
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
      res.status(400).json({ 
        error: error.message || "Failed to process form submission" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
