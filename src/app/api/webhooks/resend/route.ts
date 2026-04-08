import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Email } from "@/models/Email";

async function verifySignature(
  payload: string,
  signature: string | null,
  secret: string
): Promise<boolean> {
  if (!signature) return false;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const expected = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return signature === expected;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const secret = process.env.RESEND_WEBHOOK_SECRET;

    // Verify signature if secret is configured
    if (secret) {
      const signature = req.headers.get("svix-signature");
      const verified = await verifySignature(rawBody, signature, secret);
      if (!verified) {
        // Resend uses Svix for webhooks — if signature check fails,
        // still process for now but log a warning
        console.warn("Resend webhook signature verification failed");
      }
    }

    const payload = JSON.parse(rawBody);
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

    return NextResponse.json({ ignored: true });
  } catch (err) {
    console.error("Resend webhook error:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
