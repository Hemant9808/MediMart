// utils/email.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create a transporter object for sending emails
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any other email service provider
    auth: {
        user: "hemant@adirayglobal.com",
        pass: "ogmnatcklinhjoyl",
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: "hemant@adirayglobal.com",
    to: "kumarbittu.co@gmail.com",
    //to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
    // html: options.html, // you can also send HTML instead of plain text
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
