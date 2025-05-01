require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Sending to yourself for testing
    subject: "Test Email from Node.js",
    text: "This is a test email to verify Nodemailer is working!"
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error("Nodemailer Error:", error);
    } else {
        console.log("Email sent successfully!", info);
    }
});