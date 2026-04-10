import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Email } from "@/models/Email";

async function fetchReceivedEmailBody(emailId: string): Promise<{ text: string; html: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !emailId) return { text: "", html: "" };

  try {
    const res = await fetch(`https://api.resend.com/emails/receiving/${emailId}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return { text: "", html: "" };
    const data = await res.json();
    return { text: data.text || "", html: data.html || "" };
  } catch {
    return { text: "", html: "" };
  }
}

type AttachmentMeta = { resendId: string; filename: string; size: number; contentType: string };

async function fetchReceivedAttachments(emailId: string): Promise<AttachmentMeta[]> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !emailId) return [];

  try {
    const res = await fetch(`https://api.resend.com/emails/receiving/${emailId}/attachments`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const items: Array<{ id: string; filename: string; size: number; content_type: string }> = json.data || [];
    return items.map((a) => ({
      resendId: a.id,
      filename: a.filename,
      size: a.size,
      contentType: a.content_type,
    }));
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { type, data } = payload;

    if (type === "email.received") {
      await connectDB();

      const fromEmail = data.from || "unknown";
      const toEmail = Array.isArray(data.to) ? data.to[0] : data.to || "sam@unitedtax.us";
      const subject = data.subject || "(no subject)";
      const emailId = data.email_id;

      // Webhook only sends metadata — fetch body + attachments from Received Emails API
      let body = "";
      let htmlBody = "";
      let attachments: AttachmentMeta[] = [];

      if (emailId) {
        const [fetched, fetchedAttachments] = await Promise.all([
          fetchReceivedEmailBody(emailId),
          fetchReceivedAttachments(emailId),
        ]);
        body = fetched.text || "";
        htmlBody = fetched.html || "";
        attachments = fetchedAttachments;
      }

      // Fallback: try webhook payload fields (unlikely to contain body)
      if (!body && !htmlBody) {
        body = data.text || data.body || "";
        htmlBody = data.html || "";
      }

      if (!body) body = "(no content)";

      await Email.create({
        direction: "received",
        from: fromEmail,
        to: toEmail,
        fromName: fromEmail,
        subject,
        body,
        htmlBody,
        attachments,
        resendId: emailId,
        status: "delivered",
        read: false,
      });

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ ignored: true });
  } catch (err) {
    console.error("Resend webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed", details: String(err) },
      { status: 500 }
    );
  }
}
