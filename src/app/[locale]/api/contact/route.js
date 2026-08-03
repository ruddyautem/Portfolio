import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Minimal HTML-escaping so user-supplied text can't break out of the
// email markup or inject extra content into the message body.
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request) {
  let locale = 'fr';

  try {
    const body = await request.json();
    const { name, email, objet, message } = body;
    locale = body.locale === 'en' ? 'en' : 'fr';

    if (!name || !email || !objet || !message) {
      const msg =
        locale === 'en' ? 'Please fill in all fields.' : 'Merci de remplir tous les champs.';
      return NextResponse.json({ message: msg }, { status: 400 });
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
      auth: {
        user,
        pass: password,
      },
    });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeObjet = escapeHtml(objet);
    const safeMessage = escapeHtml(message);

    // Get current date formatted nicely
    const dateStr = new Date().toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    await transporter.sendMail({
      from: user,
      to: myEmail,
      replyTo: email,
      subject: `📬 Nouveau message de ${name} - ${objet}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; -webkit-font-smoothing: antialiased;">
          
          <!-- Outer Table for Email Client Compatibility -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);">
            
            <!-- Top Accent Bar -->
            <tr>
              <td style="height: 4px; background: linear-gradient(90deg, #10b981, #3b82f6);"></td>
            </tr>
            
            <!-- Header -->
            <tr>
              <td style="padding: 40px 40px 30px 40px; border-bottom: 1px solid #334155;">
                <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #f8fafc; letter-spacing: -0.5px;">Nouveau message ⚡️</h1>
                <p style="margin: 8px 0 0 0; font-size: 15px; color: #94a3b8;">Quelqu'un vous a contacté depuis votre portfolio.</p>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding: 30px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  
                  <!-- Sender Details -->
                  <tr>
                    <td style="padding-bottom: 24px;">
                      <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">Détails du contact</p>
                      <p style="margin: 0; font-size: 16px; color: #e2e8f0; font-weight: 500;">
                        ${safeName} <br/>
                        <a href="mailto:${safeEmail}" style="color: #38bdf8; text-decoration: none; font-size: 15px; font-weight: 400; display: inline-block; margin-top: 4px;">${safeEmail}</a>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Subject -->
                  <tr>
                    <td style="padding-bottom: 24px;">
                      <p style="margin: 0 0 6px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 700;">Objet</p>
                      <p style="margin: 0; font-size: 16px; color: #e2e8f0; font-weight: 500;">${safeObjet}</p>
                    </td>
                  </tr>
                  
                  <!-- Message Box -->
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
            
            <!-- Footer -->
            <tr>
              <td style="padding: 24px 40px; background-color: #0b1120; text-align: center; border-top: 1px solid #334155;">
                <p style="margin: 0; font-size: 13px; color: #64748b;">
                  Envoyé le ${dateStr}
                </p>
                <p style="margin: 8px 0 0 0; font-size: 13px; color: #475569;">
                  Pour répondre, cliquez simplement sur le bouton "Répondre" de votre messagerie.
                </p>
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