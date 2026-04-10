import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Email } from "@/models/Email";

async function fetchEmailBody(emailId: string): Promise<{ text: string; html: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key || !emailId) return { text: "", html: "" };

  try {
    const res = await fetch(`https://api.resend.com/emails/${emailId}`, {
      headers: { Authorization: `Bearer ${key}` },
    });
    if (!res.ok) return { text: "", html: "" };
    const data = await res.json();
    return { text: data.text || "", html: data.html || "" };
  } catch {
    return { text: "", html: "" };
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

      // Try to get body from webhook payload first, then fetch from API
      let body = data.text || data.html || data.body || "";
      let htmlBody = data.html || "";

      if (!body && emailId) {
        const fetched = await fetchEmailBody(emailId);
        body = fetched.text || fetched.html || "";
        htmlBody = fetched.html || "";
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
