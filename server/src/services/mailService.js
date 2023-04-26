const nodemailer = require('nodemailer');
const htmlForMailService = require('./htmlForMailService');

const mailService = () => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const sendActivationMail = async (to, link, name) => {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Account activation at ' + process.env.API_URL,
      text: '',
      html: htmlForMailService.htmlActivationMail(link, name),
    });
  };
  const sendResetPasswordMail = async (to, link, name) => {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Reset password at ' + process.env.API_URL,
      text: '',
      html: htmlForMailService.htmlResetPasswordMail(link, name),
    });
  };

  return {
    sendActivationMail,
    sendResetPasswordMail,
  };
};

module.exports = mailService;
