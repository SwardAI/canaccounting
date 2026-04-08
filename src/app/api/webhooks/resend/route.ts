import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Email } from "@/models/Email";

// Resend inbound email webhook
// Docs: https://resend.com/docs/dashboard/webhooks/introduction
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Resend sends different event types — we care about "email.received"
    // The inbound payload has: from, to, subject, text, html
    const { type, data } = payload;

    if (type === "email.received") {
      await connectDB();

      const fromEmail = data.from || data.envelope?.from || "unknown";
      const toEmail = Array.isArray(data.to) ? data.to[0] : data.to || "sam@unitedtax.us";
      const subject = data.subject || "(no subject)";
      const body = data.text || data.html || "";
      const htmlBody = data.html || "";

      await Email.create({
        direction: "received",
        from: fromEmail,
        to: toEmail,
        fromName: fromEmail,
        subject,
        body,
        htmlBody,
        status: "delivered",
        read: false,
      });

      return NextResponse.json({ received: true });
    }

    // Acknowledge other event types
    return NextResponse.json({ ignored: true });
  } catch (err) {
    console.error("Resend webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
