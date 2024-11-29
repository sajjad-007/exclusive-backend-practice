const nodemailer = require("nodemailer");
require('dotenv').config()
const {emailTemplate} = require("./emailTemplate")

const transporter = nodemailer.createTransport({
   service: "gmail",
    secure: true, // true for port 465, false for other ports
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper
  const sendMail = async (firstName,otp,email) => {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'sajjadhossain8123@gmail.com', // sender address
        to: email, // list of receivers
        subject: "Email verification", // Subject line
        text: "Please verify your email", // plain text body
        html: emailTemplate(firstName,otp), // html body
    });
    return  info.messageId
    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }



  
  // sendMail().catch(console.error);
module.exports = {sendMail}