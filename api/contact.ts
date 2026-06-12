import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend("re_QXCRY3q7_CZAZieMEgks3Nb776SJNKXtS");
const FROM = "Agrocom <noreply@vivorafarms.com>";
const TO = "info@vivorafarms.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { firstName, lastName, phone, email, subject, message } = req.body as {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    subject: string;
    message: string;
  };

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Confirmation to the user
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "We've received your message — Agrocom",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
          <h2 style="color:#16a34a;">Thank you, ${firstName}!</h2>
          <p>We have received your message and will get back to you shortly.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px;">
            <tr><td style="padding:6px 0;font-weight:600;width:140px;">Name</td><td>${firstName} ${lastName}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Phone</td><td>${phone}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Email</td><td>${email}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Subject</td><td>${subject}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;vertical-align:top;">Message</td><td style="white-space:pre-wrap;">${message}</td></tr>
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
          <p style="font-size:13px;color:#888;">Agrocom by Vivora Farms Limited · The Digital Future of Farming</p>
        </div>
      `,
    });

    // Notification to Vivora
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New Contact — ${subject || "General"} from ${firstName} ${lastName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
          <h2 style="color:#16a34a;">New Contact Form Submission — Agrocom</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:6px 0;font-weight:600;width:140px;">First Name</td><td>${firstName}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Last Name</td><td>${lastName}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Phone</td><td>${phone}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Email</td><td>${email}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Subject</td><td>${subject}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;vertical-align:top;">Message</td><td style="white-space:pre-wrap;">${message}</td></tr>
          </table>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
