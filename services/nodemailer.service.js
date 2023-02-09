const nodemailer = require("nodemailer");

const send = async (email, code) => {
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL, // generated ethereal user
      pass: process.env.PASSWORD, // generated ethereal password
    },
  });

  let mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email,
    subject: "Email Verification",
    text: "Your Verification code is " + code,
  };

  return transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("Error occurred. " + err.message);
    }
    return "Check ", nodemailer.getTestMessageUrl(info);
  });
};
module.exports = send;
