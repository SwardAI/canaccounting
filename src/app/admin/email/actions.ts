"use server";

import { Resend } from "resend";
import { connectDB } from "@/lib/db";
import { Email } from "@/models/Email";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "sam@unitedtax.us";

function bodyToHtml(body: string) {
  return body
    .split(/\n\n+/)
    .map(
      (p) =>
        `<p style="color: #44403c; font-size: 15px; line-height: 1.7; margin: 0 0 16px;">${p.replace(/\n/g, "<br/>")}</p>`
    )
    .join("");
}

export async function sendCustomEmail(formData: FormData) {
  const to = formData.get("to") as string;
  const subject = formData.get("subject") as string;
  const body = formData.get("body") as string;
  const fromName = (formData.get("fromName") as string) || "Sam";

  if (!to || !subject || !body) {
    return { success: false, error: "All fields are required." };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { success: false, error: "RESEND_API_KEY is not configured." };
  }

  const resend = new Resend(key);
  const htmlBody = bodyToHtml(body);

  const fullHtml = `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
      ${htmlBody}
      <p style="color: #1c1917; font-size: 15px; margin-top: 24px;">
        Best,<br/>
        <strong>${fromName}</strong><br/>
        <span style="color: #78716c; font-size: 13px;">UnitedTax</span>
      </p>
    </div>
  `;

  await connectDB();

  try {
    const result = await resend.emails.send({
      from: `${fromName} <${ADMIN_EMAIL}>`,
      to,
      replyTo: ADMIN_EMAIL,
      subject,
      html: fullHtml,
    });

    if (result.error) {
      await Email.create({
        direction: "sent",
        to,
        from: ADMIN_EMAIL,
        fromName,
        subject,
        body,
        htmlBody: fullHtml,
        status: "failed",
        error: result.error.message,
      });
      return { success: false, error: result.error.message };
    }

    await Email.create({
      direction: "sent",
      to,
      from: ADMIN_EMAIL,
      fromName,
      subject,
      body,
      htmlBody: fullHtml,
      resendId: result.data?.id,
      status: "sent",
    });

    return { success: true, id: result.data?.id };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    await Email.create({
      direction: "sent",
      to,
      from: ADMIN_EMAIL,
      fromName,
      subject,
      body,
      htmlBody: fullHtml,
      status: "failed",
      error: message,
    });
    return { success: false, error: message };
  }
}

export async function getEmails() {
  await connectDB();
  const emails = await Email.find()
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();
  return emails.map((e) => ({
    _id: String(e._id),
    direction: e.direction || "sent",
    to: e.to,
    from: e.from,
    fromName: e.fromName,
    subject: e.subject,
    body: e.body,
    status: e.status,
    read: e.read,
    error: e.error,
    createdAt: (e.createdAt as Date).toISOString(),
  }));
}

export async function markEmailRead(id: string) {
  await connectDB();
  await Email.findByIdAndUpdate(id, { read: true });
}

export async function markEmailUnread(id: string) {
  await connectDB();
  await Email.findByIdAndUpdate(id, { read: false });
}

export async function refetchEmailContent(id: string) {
  await connectDB();
  const email = await Email.findById(id);
  if (!email || !email.resendId) {
    return { success: false, error: "No Resend ID found for this email." };
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { success: false, error: "RESEND_API_KEY not configured." };
  }

  try {
    const res = await fetch(
      `https://api.resend.com/emails/receiving/${email.resendId}`,
      { headers: { Authorization: `Bearer ${key}` } }
    );
    if (!res.ok) {
      return { success: false, error: `Resend API returned ${res.status}` };
    }
    const data = await res.json();
    const body = data.text || "";
    const htmlBody = data.html || "";

    if (!body && !htmlBody) {
      return { success: false, error: "Resend returned empty content." };
    }

    await Email.findByIdAndUpdate(id, {
      body: body || htmlBody,
      htmlBody,
    });
    return { success: true, body: body || htmlBody };
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return { success: false, error: message };
  }
}
