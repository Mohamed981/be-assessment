const nodemailer = require("nodemailer");

const send = async (email, code) => {

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  let mailOptions = {
    from: 'uptimemonitor@email.com',
    to: email,
    subject: "Email Verification",
    text: "Your Verification code is " + code,
  };

  let info = await transporter.sendMail(mailOptions);
  return nodemailer.getTestMessageUrl(info);
};
module.exports = send;
