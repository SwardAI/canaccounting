import { Resend } from "resend";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn("RESEND_API_KEY not set — emails will be skipped");
    return null;
  }
  return new Resend(key);
}

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "sam@unitedtax.us";
const FROM = `UnitedTax <${ADMIN_EMAIL}>`;

// Email 1: Automatic payment confirmation (from noreply)
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
    replyTo: ADMIN_EMAIL,
    subject: "Payment confirmed — here's what happens next",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <h1 style="font-size: 24px; color: #1c1917; margin-bottom: 8px;">Payment confirmed.</h1>
        <p style="color: #78716c; font-size: 16px; margin-bottom: 32px;">
          Thank you for choosing UnitedTax. Here's a summary of your purchase.
        </p>

        <div style="background: #faf8f5; padding: 24px; margin-bottom: 32px;">
          <p style="margin: 0 0 4px; color: #78716c; font-size: 14px;">Plan</p>
          <p style="margin: 0 0 16px; color: #1c1917; font-size: 16px; font-weight: 600;">${plan}</p>
          <p style="margin: 0 0 4px; color: #78716c; font-size: 14px;">Amount</p>
          <p style="margin: 0; color: #1c1917; font-size: 16px; font-weight: 600;">${amount}</p>
        </div>

        <p style="color: #44403c; font-size: 15px; line-height: 1.6;">
          You'll receive a personal email from Sam shortly with everything we need to get started. Keep an eye on your inbox.
        </p>

        <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />
        <p style="color: #a8a29e; font-size: 12px;">
          UnitedTax — Your LLC taxes done right. Every time.
        </p>
      </div>
    `,
  });
}

// Email 2: Personal introduction from Sam (sent from Sam's address)
export async function sendIntroductionEmail(
  to: string,
  plan: string
) {
  const resend = getResend();
  if (!resend) return null;

  const isTaxReturn = plan.toLowerCase().includes("tax");
  const isAccounting = plan.toLowerCase().includes("accounting");
  const isBoth = isTaxReturn && isAccounting;

  let whatWeNeed = "";

  if (isBoth || isAccounting) {
    whatWeNeed = `
      <p style="color: #44403c; font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
        To get started with your accounting, I'll need the following:
      </p>
      <ul style="color: #44403c; font-size: 15px; line-height: 2; padding-left: 20px; margin-bottom: 24px;">
        <li>Your LLC formation documents (Articles of Organization)</li>
        <li>EIN confirmation letter from the IRS</li>
        <li>Bank statements for the current period</li>
        <li>Any existing bookkeeping records or spreadsheets</li>
        <li>Access to your accounting software (if applicable)</li>
        ${isBoth ? "<li>Profit & Loss statement for the tax year</li><li>Balance sheet for the tax year</li>" : ""}
      </ul>
    `;
  } else {
    whatWeNeed = `
      <p style="color: #44403c; font-size: 15px; line-height: 1.7; margin-bottom: 24px;">
        To prepare your tax return, I'll need a few documents from you:
      </p>
      <ul style="color: #44403c; font-size: 15px; line-height: 2; padding-left: 20px; margin-bottom: 24px;">
        <li>Profit & Loss statement for the tax year</li>
        <li>Balance sheet for the tax year</li>
        <li>Bank statements (if no formal P&L is available)</li>
        <li>EIN confirmation letter</li>
        <li>Prior year tax return (if applicable)</li>
        <li>Owner information (name, address, tax ID or passport number)</li>
      </ul>
    `;
  }

  return resend.emails.send({
    from: `Sam <${ADMIN_EMAIL}>`,
    to,
    replyTo: ADMIN_EMAIL,
    subject: `Welcome — let's get started on your ${isTaxReturn ? "tax return" : "accounting"}`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <p style="color: #44403c; font-size: 15px; line-height: 1.7;">
          Hi there,
        </p>

        <p style="color: #44403c; font-size: 15px; line-height: 1.7;">
          I'm Sam, and I'll be personally handling your ${isBoth ? "accounting and tax return" : isTaxReturn ? "LLC tax return" : "accounting"}. Thanks for choosing UnitedTax — I want to make this as smooth as possible for you.
        </p>

        ${whatWeNeed}

        <p style="color: #44403c; font-size: 15px; line-height: 1.7;">
          You can reply directly to this email with the documents attached, or let me know if you have any questions about what's needed. Don't worry if you're not sure about something — I'll walk you through it.
        </p>

        <p style="color: #44403c; font-size: 15px; line-height: 1.7;">
          Looking forward to working with you.
        </p>

        <p style="color: #1c1917; font-size: 15px; margin-top: 24px;">
          Best,<br/>
          <strong>Sam</strong><br/>
          <span style="color: #78716c; font-size: 13px;">UnitedTax</span>
        </p>

        <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />
        <p style="color: #a8a29e; font-size: 12px;">
          UnitedTax — Your LLC taxes done right. Every time.
        </p>
      </div>
    `,
  });
}

// Email to admin: notification of new purchase
export async function sendAdminNotification(
  customerEmail: string,
  plan: string,
  amount: string
) {
  const resend = getResend();
  if (!resend) return null;
  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    subject: `New purchase: ${plan} — ${customerEmail}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #1c1917;">New purchase received</h2>
        <p><strong>Customer:</strong> ${customerEmail}</p>
        <p><strong>Plan:</strong> ${plan}</p>
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p style="margin-top: 16px; color: #78716c;">An introduction email has been sent to the customer automatically.</p>
      </div>
    `,
  });
}

// Email for delivering completed return (called manually later)
export async function sendReturnDelivery(
  to: string,
  clientName: string,
  taxYear: string
) {
  const resend = getResend();
  if (!resend) return null;
  return resend.emails.send({
    from: `Sam <${ADMIN_EMAIL}>`,
    to,
    replyTo: ADMIN_EMAIL,
    subject: `Your ${taxYear} LLC tax return is ready for review`,
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
        <p style="color: #44403c; font-size: 15px; line-height: 1.7;">
          Hi${clientName ? ` ${clientName}` : ""},
        </p>

        <p style="color: #44403c; font-size: 15px; line-height: 1.7;">
          Your ${taxYear} LLC tax return is ready. Please find it attached to this email.
        </p>

        <div style="background: #faf8f5; padding: 24px; margin: 24px 0;">
          <p style="font-size: 15px; color: #1c1917; font-weight: 600; margin: 0 0 12px;">Please review and confirm:</p>
          <ul style="color: #44403c; font-size: 15px; line-height: 1.8; padding-left: 20px; margin: 0;">
            <li>Check that all information is correct</li>
            <li>Review the numbers on each form</li>
            <li>Reply with "approved" or any revision requests</li>
          </ul>
        </div>

        <p style="color: #44403c; font-size: 15px; line-height: 1.7;">
          If anything needs to be changed, just let me know — unlimited revisions are included.
        </p>

        <p style="color: #1c1917; font-size: 15px; margin-top: 24px;">
          Best,<br/>
          <strong>Sam</strong><br/>
          <span style="color: #78716c; font-size: 13px;">UnitedTax</span>
        </p>

        <hr style="border: none; border-top: 1px solid #e7e5e4; margin: 32px 0;" />
        <p style="color: #a8a29e; font-size: 12px;">
          UnitedTax — Your LLC taxes done right. Every time.
        </p>
      </div>
    `,
  });
}
