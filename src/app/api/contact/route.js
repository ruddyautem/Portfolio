import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';


// --- H1: Rate limiting ---
// In-memory rate limiting (Note: for serverless like Vercel, consider @upstash/ratelimit)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_IP = 3;
const rateLimitMap = new Map();

// --- Zod Schema for validation ---
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  sujet: z.string().min(1).max(150),
  message: z.string().min(1).max(5000),
  locale: z.enum(['en', 'fr']).default('fr'),
});

// Body text isn't used in a header, only escaped for safe HTML rendering.
const escapeHtml = (str = '') => {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export const POST = async (request) => {
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
    locale = body.locale === 'en' ? 'en' : 'fr';

    // Parse and validate using Zod. This throws a ZodError if invalid.
    const safeData = contactSchema.parse(body);

    const myEmail = process.env.MY_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!myEmail || !resendApiKey) {
      console.error('Mail Error: missing MY_EMAIL or RESEND_API_KEY env vars');
      const msg =
        locale === 'en' ? 'Your message could not be sent' : "Votre message n'a pas pu être envoyé";
      return NextResponse.json({ message: msg }, { status: 500 });
    }

    const resend = new Resend(resendApiKey);

    // HTML-escaped versions, for the body only
    const safeName = escapeHtml(safeData.name);
    const safeEmail = escapeHtml(safeData.email);
    const safeSujet = escapeHtml(safeData.sujet);
    const safeMessage = escapeHtml(safeData.message);

    const dateStr = new Date().toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const { error } = await resend.emails.send({
      // Resend requires a verified domain to send from. 'onboarding@resend.dev' works for testing 
      // but only to your registered Resend email address.
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: myEmail,
      replyTo: safeData.email, 
      subject: `📬 Nouveau message de ${safeData.name} - ${safeData.sujet}`,
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

    if (error) {
      console.error('Resend API Error:', error);
      const errorMsg =
        locale === 'en' ? 'Your message could not be sent' : "Votre message n'a pas pu être envoyé";
      return NextResponse.json({ message: errorMsg }, { status: 500 });
    }

    const successMsg =
      locale === 'en'
        ? "Message sent! I'll get back to you within 24 hours :)"
        : 'Message envoyé! Je reviens vers vous sous 24h :)';

    return NextResponse.json({ message: successMsg }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const badMsg = locale === 'en' ? 'Invalid input.' : 'Entrée invalide.';
      return NextResponse.json({ message: badMsg }, { status: 400 });
    }
    
    console.error('Mail Error:', error);
    const errorMsg =
      locale === 'en' ? 'Your message could not be sent' : "Votre message n'a pas pu être envoyé";
    return NextResponse.json({ message: errorMsg }, { status: 500 });
  }
};
