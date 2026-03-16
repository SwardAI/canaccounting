import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set — emails will be skipped");
    return null;
  }
  return new Resend(key);
}

const FROM = process.env.EMAIL_FROM || "CanTax <noreply@yourdomain.com>";
const REPLY_TO = process.env.ADMIN_EMAIL || "support@yourdomain.com";

export async function sendPurchaseConfirmation(
  to: string,
  plan: string,
  amount: string
) {
  const resend = getResend();
  if (!resend) return null;
  return resend.emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject: "Payment confirmed — here's what happens next",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; color: #1c1917; margin-bottom: 8px;">Payment confirmed.</h1>
        <p style="color: #78716c; font-size: 16px; margin-bottom: 32px;">
          Thank you for choosing CanTax. Here's a summary of your purchase.
        </p>

        <div style="background: #faf8f5; padding: 24px; margin-bottom: 32px;">
          <p style="margin: 0 0 4px; color: #78716c; font-size: 14px;">Plan</p>
          <p style="margin: 0 0 16px; color: #1c1917; font-size: 16px; font-weight: 600;">${plan}</p>
          <p style="margin: 0 0 4px; color: #78716c; font-size: 14px;">Amount</p>
          <p style="margin: 0; color: #1c1917; font-size: 16px; font-weight: 600;">${amount}</p>
        </div>

        <h2 style="font-size: 18px; color: #1c1917; margin-bottom: 16px;">What happens next?</h2>
        <ol style="color: #44403c; font-size: 15px; line-height: 1.8; padding-left: 20px;">
          <li>We'll reach out within 24 hours with instructions to upload your documents.</li>
          <li>Our team prepares your return — typically within 48 hours.</li>
          <li>You'll receive your completed return via email for review.</li>
        </ol>

        <p style="color: #78716c; font-size: 14px; margin-top: 32px;">
          Questions? Just reply to this email — we're here to help.
        </p>

        <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />
        <p style="color: #a8a29e; font-size: 12px;">
          CanTax — Your LLC taxes done right. Every time.
        </p>
      </div>
    `,
  });
}

export async function sendReturnDelivery(
  to: string,
  clientName: string,
  taxYear: string
) {
  // This would include an attachment in production
  const resend = getResend();
  if (!resend) return null;
  return resend.emails.send({
    from: FROM,
    to,
    replyTo: REPLY_TO,
    subject: `Your ${taxYear} LLC tax return is ready for review`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; color: #1c1917; margin-bottom: 8px;">Your return is ready.</h1>
        <p style="color: #78716c; font-size: 16px; margin-bottom: 32px;">
          Hi${clientName ? ` ${clientName}` : ''}, your ${taxYear} LLC tax return has been prepared and reviewed. Please find it attached.
        </p>

        <div style="background: #faf8f5; padding: 24px; margin-bottom: 32px;">
          <h2 style="font-size: 16px; color: #1c1917; margin: 0 0 12px;">Please review and confirm:</h2>
          <ul style="color: #44403c; font-size: 15px; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>Check that all information is correct</li>
            <li>Review the numbers on each form</li>
            <li>Reply with "approved" or any revision requests</li>
          </ul>
        </div>

        <p style="color: #44403c; font-size: 15px;">
          If anything needs to be changed, just let us know — unlimited revisions are included.
        </p>

        <p style="color: #78716c; font-size: 14px; margin-top: 32px;">
          Reply to this email with any questions or revision requests.
        </p>

        <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />
        <p style="color: #a8a29e; font-size: 12px;">
          CanTax — Your LLC taxes done right. Every time.
        </p>
      </div>
    `,
  });
}

export async function sendAdminNotification(
  customerEmail: string,
  plan: string,
  amount: string
) {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@yourdomain.com";

  const resend = getResend();
  if (!resend) return null;
  return resend.emails.send({
    from: FROM,
    to: adminEmail,
    subject: `New purchase: ${plan} — ${customerEmail}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #1c1917;">New purchase received</h2>
        <p><strong>Customer:</strong> ${customerEmail}</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
      </div>
    `,
  });
}
