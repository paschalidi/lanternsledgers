import { Resend } from "resend";
import { NextResponse } from "next/server";

const FROM = "Lanterns & Ledgers <hello@lanternsledgers.co.uk>";
const MAX_PER_HOUR = 5;
const WINDOW_MS = 60 * 60 * 1000;

const submissions = new Map();

function rateLimited(ip) {
  const now = Date.now();
  const recent = (submissions.get(ip) || []).filter(
    (t) => now - t < WINDOW_MS,
  );
  if (recent.length >= MAX_PER_HOUR) {
    submissions.set(ip, recent);
    return true;
  }
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(body) {
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 100)
    return { error: "Please enter your name (2-100 characters)." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    return { error: "Please enter a valid email address." };
  if (message.length < 10 || message.length > 5000)
    return { error: "Please write a message of at least 10 characters." };

  return { name, email, message };
}

function emailHtml({ name, email, message }) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background-color:#f4ede2;font-family:Georgia,'Times New Roman',serif;color:#1b3a5c;">
    <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.09em;color:#52615a;font-family:Arial,Helvetica,sans-serif;text-transform:uppercase;">Lanterns &amp; Ledgers</p>
      <h1 style="margin:0 0 24px;font-size:24px;font-weight:600;color:#1b3a5c;">New website enquiry from ${safeName}</h1>
      <table style="width:100%;border-collapse:collapse;background-color:#ffffff;border-radius:12px;">
        <tr>
          <td style="padding:24px 24px 0 24px;font-size:13px;color:#52615a;font-family:Arial,Helvetica,sans-serif;">Name</td>
        </tr>
        <tr>
          <td style="padding:0 24px;font-size:16px;color:#1b3a5c;"><strong>${safeName}</strong></td>
        </tr>
        <tr>
          <td style="padding:16px 24px 0 24px;font-size:13px;color:#52615a;font-family:Arial,Helvetica,sans-serif;">Email</td>
        </tr>
        <tr>
          <td style="padding:0 24px;font-size:16px;"><a href="mailto:${safeEmail}" style="color:#1b3a5c;">${safeEmail}</a></td>
        </tr>
        <tr>
          <td style="padding:16px 24px 0 24px;font-size:13px;color:#52615a;font-family:Arial,Helvetica,sans-serif;">Message</td>
        </tr>
        <tr>
          <td style="padding:8px 24px 24px 24px;">
            <div style="background-color:#f4ede2;border-radius:8px;padding:16px;font-size:15px;line-height:1.6;color:#1b3a5c;white-space:pre-wrap;">${safeMessage}</div>
          </td>
        </tr>
      </table>
      <div style="text-align:center;padding:28px 0;">
        <a href="mailto:${safeEmail}?subject=Re: Your message to Lanterns %26 Ledgers" style="display:inline-block;background-color:#c8553d;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:600;padding:12px 28px;border-radius:100px;">Reply to ${safeName}</a>
      </div>
      <p style="margin:0;font-size:12px;color:#52615a;font-family:Arial,Helvetica,sans-serif;text-align:center;">Sent from the contact form at lanternsledgers.co.uk</p>
    </div>
  </body>
</html>`;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const result = validate(body);
  if (result.error) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFICATION_TO;
  if (!apiKey || !to) {
    console.error(
      "Contact form not configured: set RESEND_API_KEY and CONTACT_NOTIFICATION_TO.",
    );
    return NextResponse.json(
      { ok: false, error: "The contact form is not set up yet. Please try again later." },
      { status: 500 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM,
      to,
      reply_to: result.email,
      subject: `New website enquiry: ${result.name}`,
      text: `Name: ${result.name}\nEmail: ${result.email}\n\n${result.message}\n\n---\nSent from the contact form at lanternsledgers.co.uk`,
      html: emailHtml(result),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: false, error: "That didn't send. Please try again in a moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { ok: false, error: "That didn't send. Please try again in a moment." },
      { status: 500 },
    );
  }
}
