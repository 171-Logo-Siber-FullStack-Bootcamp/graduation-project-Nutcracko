//LIBS
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

sendVerification = async (userDB) => {
  const verificationToken = jwt.sign(
    { _id: userDB._id },
    process.env.EMAIL_VERIFY_TOKEN
  );

  let link = `http://localhost:3030/api/auth/activation?actkey=${verificationToken}`;

  //send a verification mail
  const transporter = nodemailer.createTransport({
    service: "yandex",
    auth: {
      user: process.env.EMAILID,
      pass: process.env.EMAILPASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAILID,
      to: userDB.email,
      subject: "Account Verification",
      text: "Thank you!",
      html: `<p>The registration process of your Nut-Ecommerce Web App is being started. To complete the process please verify your account by clicking on the link below.</p><h1>Please click on the link below to activate your account:</h1><p>${link}</p>`,
    });
    return null;
  } catch (error) {
    return error;
  }
};

module.exports.sendVerification = sendVerification;
