import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { Resend } from "resend";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || "Valued Customer";

    if (customerEmail) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: `TaxLLC <${process.env.CONTACT_EMAIL || "noreply@yourdomain.com"}>`,
          to: customerEmail,
          subject: "Welcome to TaxLLC - Next Steps for Your Tax Filing",
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="color: #1e293b; font-size: 24px; margin: 0;">TaxLLC</h1>
  </div>

  <h2 style="color: #059669; font-size: 20px;">Thank You for Your Purchase, ${customerName}!</h2>

  <p>We're excited to help you with your US LLC tax needs. Here's what happens next:</p>

  <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0;">
    <h3 style="color: #1e293b; margin-top: 0;">Documents We Need From You:</h3>
    <ul style="color: #64748b; padding-left: 20px;">
      <li>Bank statements for your US LLC (all accounts, full year)</li>
      <li>Income records (invoices, payment processor statements)</li>
      <li>Expense receipts and records</li>
      <li>Previous year's tax return (if applicable)</li>
      <li>Your LLC formation documents (EIN letter, Operating Agreement)</li>
    </ul>
  </div>

  <div style="background-color: #059669; color: white; border-radius: 8px; padding: 20px; margin: 24px 0;">
    <h3 style="margin-top: 0;">How to Send Your Documents:</h3>
    <p style="margin-bottom: 0;">Simply reply to this email with your documents attached. We accept PDF, images, or Excel files. If you have many files, you can use a file sharing service like Google Drive or Dropbox and send us the link.</p>
  </div>

  <p>Once we receive your documents, our team will:</p>
  <ol style="color: #64748b;">
    <li>Review everything within 2-3 business days</li>
    <li>Reach out if we need any additional information</li>
    <li>Prepare and file your tax return before the deadline</li>
    <li>Send you a copy of the filed return for your records</li>
  </ol>

  <p style="margin-top: 32px;">
    <strong>Questions?</strong> Reply to this email or contact us at
    <a href="mailto:${process.env.CONTACT_EMAIL || "contact@yourdomain.com"}" style="color: #059669;">${process.env.CONTACT_EMAIL || "contact@yourdomain.com"}</a>
  </p>

  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">

  <p style="color: #94a3b8; font-size: 12px; text-align: center;">
    TaxLLC - Professional Tax Filing Services for US LLC Owners<br>
    This email was sent because you made a purchase on our website.
  </p>
</body>
</html>
          `,
        });

        console.log(`Confirmation email sent to ${customerEmail}`);
      } catch (emailError) {
        console.error("Failed to send confirmation email:", emailError);
        // Don't fail the webhook if email fails - we still completed the purchase
      }
    }
  }

  return NextResponse.json({ received: true });
}
