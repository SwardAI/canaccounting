import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Email } from "@/models/Email";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { type, data } = payload;

    if (type === "email.received") {
      await connectDB();

      const fromEmail = data.from || "unknown";
      const toEmail = Array.isArray(data.to) ? data.to[0] : data.to || "sam@unitedtax.us";
      const subject = data.subject || "(no subject)";
      // Resend may send body as text, html, or neither in the webhook
      const body = data.text || data.html || data.body || subject;
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

    return NextResponse.json({ ignored: true });
  } catch (err) {
    console.error("Resend webhook error:", err);
    return NextResponse.json(
      { error: "Webhook processing failed", details: String(err) },
      { status: 500 }
    );
  }
}
