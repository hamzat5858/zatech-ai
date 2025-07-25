// api/sendMail.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Sadece POST istekleri kabul edilir.' });
  }

  const { subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hamzatanriverdi42@gmail.com',
      pass: 'lycrbeqabingqolj', // Buraya gerçek uygulama şifreni yazacaksın
    },
  });

  const mailOptions = {
    from: 'hamzatanriverdi42@gmail.com',
    to: 'hamzatanriverdi42@gmail.com',
    subject: subject || 'ZATECH Bildirimi',
    text: text || 'Yeni ZATECH isteği geldi.',
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Mail gönderildi' });
  } catch (error) {
    console.error('Mail gönderim hatası:', error);
    res.status(500).json({ message: 'Mail gönderilemedi', error });
  }
}
