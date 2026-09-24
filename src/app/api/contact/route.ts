import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { createHash } from 'node:crypto';

const RATE_LIMIT_WINDOW_SECONDS = 10 * 60;
const MAX_REQUESTS_PER_IP = 3;
const MAX_REQUEST_BODY_BYTES = 32 * 1024;
const localRateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_SCRIPT = `
  local count = redis.call('INCR', KEYS[1])
  if count == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
  return count
`;

function rateLimitResponse(locale: string, status: number) {
  const message =
    status === 429
      ? locale === 'en'
        ? 'Too many messages sent. Please wait a few minutes before trying again.'
        : 'Trop de messages envoyés. Veuillez patienter quelques minutes avant de réessayer.'
      : locale === 'en'
        ? 'The contact form is temporarily unavailable. Please try again later.'
        : 'Le formulaire de contact est temporairement indisponible. Veuillez réessayer plus tard.';

  return NextResponse.json({ message }, { status });
}

function payloadTooLargeResponse(locale: string) {
  const message =
    locale === 'en'
      ? 'Your message is too large. Please keep it under 5,000 characters.'
      : 'Votre message est trop volumineux. Veuillez le limiter à 5 000 caractères.';

  return NextResponse.json({ message }, { status: 413 });
}

async function checkContactRateLimit(request: Request, locale: string) {
  // In development, use a bounded per-process limiter so no shared service is needed.
  if (process.env.NODE_ENV !== 'production') {
    const now = Date.now();
    const ip = request.headers.get('x-real-ip')?.trim() || 'local-development';
    const activeRequests = (localRateLimitMap.get(ip) ?? []).filter(
      (timestamp) => timestamp > now - RATE_LIMIT_WINDOW_SECONDS * 1000,
    );

    if (activeRequests.length >= MAX_REQUESTS_PER_IP) {
      return rateLimitResponse(locale, 429);
    }

    activeRequests.push(now);
    localRateLimitMap.set(ip, activeRequests);

    if (localRateLimitMap.size > 1000) {
      for (const [key, timestamps] of localRateLimitMap) {
        if (timestamps.every((timestamp) => timestamp <= now - RATE_LIMIT_WINDOW_SECONDS * 1000)) {
          localRateLimitMap.delete(key);
        }
      }
    }

    return null;
  }

  // Production must sit behind a proxy that overwrites x-real-ip and have a
  // shared Upstash Redis limiter configured; never trust a client supplied XFF value.
  const clientIp = request.headers.get('x-real-ip')?.trim();
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/+$/, '');
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!clientIp || !redisUrl || !redisToken) {
    console.error(
      'Contact rate limiting unavailable: configure trusted x-real-ip and Upstash credentials.',
    );
    return rateLimitResponse(locale, 503);
  }

  try {
    const response = await fetch(redisUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${redisToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        'EVAL',
        RATE_LIMIT_SCRIPT,
        '1',
        `portfolio:contact:${createHash('sha256').update(clientIp).digest('hex')}`,
        String(RATE_LIMIT_WINDOW_SECONDS),
      ]),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Upstash returned HTTP ${response.status}`);
    }

    const result = (await response.json()) as { result?: number };
    if (typeof result.result !== 'number') {
      throw new Error('Upstash returned an invalid rate-limit result.');
    }

    return result.result > MAX_REQUESTS_PER_IP ? rateLimitResponse(locale, 429) : null;
  } catch (error) {
    console.error('Contact rate limiter error:', error);
    return rateLimitResponse(locale, 503);
  }
}

// Strict email regex:
// - Local part: letters, digits, standard dots/hyphens/plus (no special symbols like @, &, ", etc.)
// - Domain: valid labels with hyphens, followed by a valid TLD of at least 2 alpha characters
const EMAIL_STRICT_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;

const contactSchema = (locale: string) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(
        3,
        locale === 'en'
          ? 'Your name must have at least 3 characters.'
          : 'Votre nom doit comporter au moins 3 caractères.',
      )
      .max(
        100,
        locale === 'en'
          ? 'Your name cannot exceed 100 characters.'
          : 'Votre nom ne peut pas dépasser 100 caractères.',
      )
      .regex(
        /^[^\r\n]+$/,
        locale === 'en'
          ? 'Your name contains invalid characters.'
          : 'Votre nom contient des caractères non valides.',
      ),
    email: z
      .string()
      .trim()
      .max(254, locale === 'en' ? 'Email address is too long.' : "L'adresse email est trop longue.")
      .regex(
        EMAIL_STRICT_REGEX,
        locale === 'en'
          ? 'Please enter a valid email address (e.g. name@example.com).'
          : 'Veuillez saisir une adresse email valide (ex: nom@exemple.com).',
      ),
    sujet: z
      .string()
      .trim()
      .min(
        2,
        locale === 'en'
          ? 'The subject must have at least 2 characters.'
          : 'Le sujet doit comporter au moins 2 caractères.',
      )
      .max(
        150,
        locale === 'en'
          ? 'The subject cannot exceed 150 characters.'
          : 'Le sujet ne peut pas dépasser 150 caractères.',
      )
      .regex(
        /^[^\r\n]+$/,
        locale === 'en'
          ? 'The subject contains invalid characters.'
          : 'Le sujet contient des caractères non valides.',
      ),
    message: z
      .string()
      .trim()
      .min(
        10,
        locale === 'en'
          ? 'Your message must have at least 10 characters.'
          : 'Votre message doit comporter au moins 10 caractères.',
      )
      .max(
        5000,
        locale === 'en'
          ? 'Your message is too long (5000 characters max).'
          : 'Votre message est trop long (5000 caractères max).',
      ),
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
  const contentLength = request.headers.get('content-length');
  if (contentLength) {
    const declaredSize = Number(contentLength);
    if (!Number.isSafeInteger(declaredSize) || declaredSize < 0) {
      return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
    }
    if (declaredSize > MAX_REQUEST_BODY_BYTES) {
      return payloadTooLargeResponse('fr');
    }
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  const locale = body?.locale === 'en' ? 'en' : 'fr';

  // Honeypot trap: if filled by spam bots, silently pretend success.
  if (body?.website || body?._gotcha) {
    const fakeMsg =
      locale === 'en'
        ? "Message sent! I'll get back to you within 24 hours :)"
        : 'Message envoyé! Je reviens vers vous sous 24h :)';
    return NextResponse.json({ message: fakeMsg }, { status: 200 });
  }

  const rateLimitResult = await checkContactRateLimit(request, locale);
  if (rateLimitResult) return rateLimitResult;

  try {
    // Parse and validate using Zod with localized and strict rules
    const schema = contactSchema(locale);
    const safeData = schema.parse(body);

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
      // Return the specific message of the first failing field
      const firstIssue = error.issues[0];
      const fieldName = firstIssue?.path[0] ? String(firstIssue.path[0]) : null;
      const specificMessage =
        firstIssue?.message || (locale === 'en' ? 'Invalid input.' : 'Entrée invalide.');

      return NextResponse.json(
        {
          message: specificMessage,
          field: fieldName,
          errors: error.issues.map((i) => ({ field: i.path[0], message: i.message })),
        },
        { status: 400 },
      );
    }

    console.error('Mail Error:', error);
    const errorMsg =
      locale === 'en' ? 'Your message could not be sent' : "Votre message n'a pas pu être envoyé";
    return NextResponse.json({ message: errorMsg }, { status: 500 });
  }
};
