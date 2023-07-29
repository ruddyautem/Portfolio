import nodemailer from 'nodemailer';

const ContactAPI = async (req, res) => {
  const { name, email, objet, message } = req.body;

  const user = process.env.USER;

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
      pass: process.env.PASS,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: user,
      to: 'ruddy.autem@gmail.com',
      replyTo: email,
      subject: `Contact via portfolio de la part de ${name}`,
      html: `
      <p>Message de la part de: ${name}</p>
      <p>Email: ${email}</p>
      <p>Objet: ${objet}</p>
      <p>Message: ${message}</p>
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
