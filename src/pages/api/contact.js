import nodemailer from "nodemailer";

const ContactAPI = async (req, res) => {
  const { name, email, objet, message } = req.body;

  const host = process.env.MAIL_HOST;
  const user = process.env.MAIL_USER;
  const password = process.env.MAIL_PASSWORD;
  const myEmail = process.env.MY_EMAIL;

  const data = {
    name,
    email,
    objet,
    message,
  };

  const transporter = nodemailer.createTransport({
    host: host,
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: password,
    },
  });

  try {
    const mail = await transporter.sendMail({
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
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; background-color: #f5f7fa;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #242936 0%, #4a5568 100%); padding: 30px 25px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Nouveau message</h1>
              <p style="color: #e2e8f0; margin: 8px 0 0 0; font-size: 16px;">Via votre portfolio</p>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <!-- Sender Info -->
              <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 25px; border-left: 4px solid #242936;">
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                  <div style="width: 40px; height: 40px; background: #242936; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 15px;">
                    <span style="color: white; font-weight: bold; font-size: 18px; display: flex; align-items: center; justify-content: center;">${name.charAt(0)}</span>
                  </div>
                  <div>
                    <h2 style="margin: 0; color: #2d3748; font-size: 20px; font-weight: 600;">${name}</h2>
                    <p style="margin: 4px 0 0 0; color: #4a5568; font-size: 15px;">
                      <a href="mailto:${email}" style="color: #242936; text-decoration: none;">${email}</a>
                    </p>
                  </div>
                </div>
              </div>
              
              <!-- Subject -->
              <div style="margin-bottom: 25px;">
                <h3 style="margin: 0 0 12px 0; color: #2d3748; font-size: 18px; font-weight: 600;">Objet</h3>
                <div style="background: #edf2f7; padding: 15px 20px; border-radius: 8px; border-left: 3px solid #4299e1;">
                  <p style="margin: 0; color: #2d3748; font-size: 16px; font-weight: 500;">${objet}</p>
                </div>
              </div>
              
              <!-- Message -->
              <div>
                <h3 style="margin: 0 0 12px 0; color: #2d3748; font-size: 18px; font-weight: 600;">Message</h3>
                <div style="background: white; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                  <p style="margin: 0; color: #2d3748; line-height: 1.6; font-size: 15px; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #edf2f7;">
              <p style="margin: 0; color: #718096; font-size: 14px;">
                Message reçu via votre portfolio - ${new Date().toLocaleString("fr-FR")}
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return res.status(200).json({
      message: "Message envoyé! Je reviens vers vous sous 24h :)",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Votre message n'a pas pû être envoyé" });
  }
};

export default ContactAPI;
