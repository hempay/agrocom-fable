import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend("re_QXCRY3q7_CZAZieMEgks3Nb776SJNKXtS");
const FROM = "Agrocom <noreply@vivorafarms.com>";
const TO = "support@agrocom.cloud";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { fullName, email, phone, username, reason, additionalInfo } = req.body as {
    fullName: string;
    email: string;
    phone: string;
    username: string;
    reason: string;
    additionalInfo: string;
  };

  if (!fullName || !email || !reason) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Confirmation to the user
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Account Deletion Request Received — Agrocom",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
          <h2 style="color:#dc2626;">Account Deletion Request</h2>
          <p>Hi ${fullName},</p>
          <p>We have received your account deletion request. Our support team will process it within <strong>7 business days</strong>.</p>
          <p>During this period your account remains active — you can cancel this request by logging in and contacting support.</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px;">
            <tr><td style="padding:6px 0;font-weight:600;width:160px;">Full Name</td><td>${fullName}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Email</td><td>${email}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Phone</td><td>${phone || "—"}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Username</td><td>${username || "—"}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Reason</td><td>${reason}</td></tr>
            ${additionalInfo ? `<tr><td style="padding:6px 0;font-weight:600;vertical-align:top;">Additional Info</td><td style="white-space:pre-wrap;">${additionalInfo}</td></tr>` : ""}
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee;" />
          <p style="font-size:13px;color:#888;">If you did not make this request, contact us immediately at support@agrocom.app</p>
          <p style="font-size:13px;color:#888;">Agrocom by Vivora Farms Limited</p>
        </div>
      `,
    });

    // Notification to support
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Account Deletion Request — ${fullName} (${email})`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#222;">
          <h2 style="color:#dc2626;">Account Deletion Request</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tr><td style="padding:6px 0;font-weight:600;width:160px;">Full Name</td><td>${fullName}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Email</td><td>${email}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Phone</td><td>${phone || "—"}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Username / ID</td><td>${username || "—"}</td></tr>
            <tr><td style="padding:6px 0;font-weight:600;">Reason</td><td>${reason}</td></tr>
            ${additionalInfo ? `<tr><td style="padding:6px 0;font-weight:600;vertical-align:top;">Additional Info</td><td style="white-space:pre-wrap;">${additionalInfo}</td></tr>` : ""}
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
