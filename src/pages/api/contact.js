import nodemailer from 'nodemailer';

const ContactAPI = async (req, res) => {
  const { name, email, objet, message } = req.body;

const user = process.env.SMTP_USER;
const password = process.env.SMTP_PASSWORD;

  const data = {
    name,
    email,
    objet,
    message,
  };

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
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
      to: 'ruddy.autem@gmail.com',
      replyTo: email,
      subject: `Contact via portfolio de la part de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 5px; padding: 20px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333; margin-bottom: 20px;">Nouveau message de la part de ${name}</h2>
          <hr style="border: none; border-top: 1px solid #eee;">
          <p style="font-weight: bold; color: #0066cc; margin-bottom: 10px; font-size: 16px;">${email}</p>
          <hr style="border: none; border-top: 1px solid #eee;">
          <p style="font-weight: bold; color: #333; margin-bottom: 10px; font-size: 16px;">${objet}</p>
          <hr style="border: none; border-top: 1px solid #eee;">
          <p style="font-size: 14px; color: #222222;">${message}</p>
        </div>
      `,
    });

    return res.status(200).json({
      message: 'Votre message a été envoyé. Je reviens vers vous rapidement :)',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Votre message n'a pas pû être envoyé" });
  }
};

export default ContactAPI;
