require('dotenv').config({ path: __dirname + '/.env' });

// Print environment variables for debugging (remove or limit in production)
console.log("Loaded environment variables successfully.");
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Configured" : "Not Set");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Configured" : "Not Set");
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Email configuration (using environment variables)
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // This should be your App Password
    }
});

// Verify email transporter connection at startup
transporter.verify((error, success) => {
    if (error) {
        console.error("Error connecting to email service:", error);
    } else {
        console.log("Email server is ready to send messages.");
    }
});

// Root route to handle GET requests
app.get('/', (req, res) => {
    res.send("Welcome to Rio's Cafe Backend Server!");
});

// Endpoint to send email (order) via POST request
app.post('/send-order', (req, res) => {
    console.log("Received request body:", req.body);

    const { orders, name, location, time } = req.body;

    // Validate request data:
    // Check that orders is provided, is an array, and contains at least one element.
    if (!orders || !Array.isArray(orders) || orders.length === 0 || !name || !location || !time) {
        return res.status(400).json({ error: "Incomplete or invalid order details" });
    }

    // Construct email content
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Modify this if orders should be sent elsewhere
        subject: "New Order from Rio's Cafe",
        text: `Customer Name: ${name}\nLocation: ${location}\nServing Time: ${time}\nOrder: ${orders.join(', ')}`
    };

    // Send the email using the configured transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Full Nodemailer Error:", error);
            // Do not expose internal error details to the client in production
            return res.status(500).json({ error: "Failed to send email. Please try again later." });
        }
        console.log("Email sent successfully!", info);
        res.json({ message: "Order sent successfully!", info });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
