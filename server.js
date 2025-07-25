const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Gmail SMTP ayarları (kendi mail bilgilerinle değiştir)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seningmail@gmail.com',
    pass: 'gmail-app-password'  // Gmail uygulama şifresi oluşturmalısın
  }
});

// Onay bekleyen cihazları basitçe saklamak için dizi
const pendingApprovals = [];

app.post('/api/register', (req, res) => {
  const { ip, device } = req.body;

  // Mail içeriği
  const mailOptions = {
    from: 'seningmail@gmail.com',
    to: 'hamzatanriverdi42@gmail.com',
    subject: 'Yeni sohbet isteği',
    text: `Yeni sohbet talebi var:\nIP: ${ip}\nCihaz: ${device}\n\nOnaylamak için siteye giriş yapabilirsiniz.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send('Mail gönderilemedi');
    } else {
      console.log('Mail gönderildi: ' + info.response);
      if(!pendingApprovals.find(e => e.ip === ip)) {
        pendingApprovals.push({ip, device});
      }
      res.send('Kayıt başarılı');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend ${PORT} portunda çalışıyor`));
