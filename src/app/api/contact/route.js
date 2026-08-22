import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// --- H1: Rate limiting ---
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_IP = 3;
const rateLimitMap = new Map();

// --- H2: Strip/reject CRLF before anything touches an email header ---
function sanitizeHeaderValue(str) {
  if (typeof str !== 'string') return null;
  // Stripping raw control characters is the point of this function (defense
  // against header injection), so the literal control-char ranges below are
  // intentional, not an accident — hence the targeted eslint suppression.
  // eslint-disable-next-line no-control-regex
  const stripped = str.replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, '');
  if (/[\r\n]/.test(stripped)) return null; // reject outright, don't silently blank it
  return stripped.trim();
}

// Body text isn't used in a header, only escaped for safe HTML rendering.
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = { name: 100, sujet: 150, email: 254, message: 5000 };

export async function POST(request) {
  // --- Rate limiting ---
  const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();

  if (!rateLimitMap.has(clientIP)) rateLimitMap.set(clientIP, []);
  const requests = rateLimitMap.get(clientIP);

  while (requests.length > 0 && requests[0] < now - RATE_LIMIT_WINDOW_MS) {
    requests.shift();
  }

  if (requests.length >= MAX_REQUESTS_PER_IP) {
    return NextResponse.json({ message: 'Too many requests. Try again later.' }, { status: 429 });
  }

  rateLimitMap.set(clientIP, [...requests, now]);
  // ----------------------------------------

  let locale = 'fr';

  try {
    const body = await request.json();
    const { name, email, sujet, message } = body;
    locale = body.locale === 'en' ? 'en' : 'fr';

    const errMsg =
      locale === 'en' ? 'Please fill in all fields.' : 'Merci de remplir tous les champs.';
    const badMsg = locale === 'en' ? 'Invalid input.' : 'Entrée invalide.';

    if (!name || !email || !sujet || !message) {
      return NextResponse.json({ message: errMsg }, { status: 400 });
    }

    if (
      name.length > MAX_LEN.name ||
      sujet.length > MAX_LEN.sujet ||
      email.length > MAX_LEN.email ||
      message.length > MAX_LEN.message
    ) {
      return NextResponse.json({ message: badMsg }, { status: 400 });
    }

    // --- Sanitize/validate everything that ends up in a header ---
    const headerSafeName = sanitizeHeaderValue(name);
    const headerSafeSujet = sanitizeHeaderValue(sujet);
    const headerSafeEmail = sanitizeHeaderValue(email);

    if (
      !headerSafeName ||
      !headerSafeSujet ||
      !headerSafeEmail ||
      !EMAIL_RE.test(headerSafeEmail)
    ) {
      // Sanitization stripped something (CRLF attempt) or email isn't a real email.
      // Reject outright rather than sending a mangled/blank message.
      return NextResponse.json({ message: badMsg }, { status: 400 });
    }

    const host = process.env.MAIL_HOST;
    const user = process.env.MAIL_USER;
    const password = process.env.MAIL_PASSWORD;
    const myEmail = process.env.MY_EMAIL;

    if (!host || !user || !password || !myEmail) {
      console.error('Mail Error: missing MAIL_HOST/MAIL_USER/MAIL_PASSWORD/MY_EMAIL env vars');
      const msg =
        locale === 'en' ? 'Your message could not be sent' : "Votre message n'a pas pu être envoyé";
      return NextResponse.json({ message: msg }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host,
      port: 465,
      secure: true,
      auth: { user, pass: password },
    });

    // HTML-escaped versions, for the body only
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(headerSafeEmail);
    const safeSujet = escapeHtml(sujet);
    const safeMessage = escapeHtml(message);

    const dateStr = new Date().toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    await transporter.sendMail({
      from: user,
      to: myEmail,
      replyTo: headerSafeEmail, // sanitized + regex-validated, safe for header use
      subject: `📬 Nouveau message de ${headerSafeName} - ${headerSafeSujet}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; -webkit-font-smoothing: antialiased;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);">
            <tr><td style="height: 4px; background: linear-gradient(90deg, #10b981, #3b82f6);"></td></tr>
            <tr>
              <td style="padding: 40px 40px 30px 40px; border-bottom: 1px solid #334155;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #f8fafc; letter-spacing: -0.5px;">Nouveau message ⚡️</h1>
                <p style="margin: 8px 0 0 0; font-size: 15px; color: #94a3b8;">Quelqu'un vous a contacté depuis votre portfolio.</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-bottom: 24px;">
                      <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">Détails du contact</p>
                      <p style="margin: 0; font-size: 16px; color: #e2e8f0; font-weight: 500;">
                        ${safeName} <br/>
                        <a href="mailto:${safeEmail}" style="color: #38bdf8; text-decoration: none; font-size: 15px; font-weight: 400; display: inline-block; margin-top: 4px;">${safeEmail}</a>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 24px;">
                      <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">Sujet</p>
                      <p style="margin: 0; font-size: 16px; color: #e2e8f0; font-weight: 500;">${safeSujet}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">Message</p>
                      <div style="background-color: #0f172a; padding: 24px; border-radius: 8px; border: 1px solid #334155;">
                        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap;">${safeMessage}</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 40px; background-color: #0b1120; text-align: center; border-top: 1px solid #334155;">
                <p style="margin: 0; font-size: 13px; color: #64748b;">Envoyé le ${dateStr}</p>
                <p style="margin: 8px 0 0 0; font-size: 13px; color: #475569;">Pour répondre, cliquez simplement sur le bouton "Répondre" de votre messagerie.</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    const successMsg =
      locale === 'en'
        ? "Message sent! I'll get back to you within 24 hours :)"
        : 'Message envoyé! Je reviens vers vous sous 24h :)';

    return NextResponse.json({ message: successMsg }, { status: 200 });
  } catch (error) {
    console.error('Mail Error:', error);
    const errorMsg =
      locale === 'en' ? 'Your message could not be sent' : "Votre message n'a pas pu être envoyé";
    return NextResponse.json({ message: errorMsg }, { status: 500 });
  }
}
