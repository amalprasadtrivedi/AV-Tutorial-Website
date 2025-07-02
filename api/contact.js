// api/contact.js - Vercel Serverless Function to handle contact form submissions

// Import Nodemailer to send emails.
// You'll need to install this: npm install nodemailer
const nodemailer = require('nodemailer');

// This is the main handler function for your serverless function.
// Vercel automatically maps requests to functions in the 'api' directory.
module.exports = async (req, res) => {
    // Ensure the request method is POST.
    if (req.method !== 'POST') {
        // If not POST, return a 405 Method Not Allowed error.
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Destructure form data from the request body.
    const { name, email, phone, course, message } = req.body;

    // Basic server-side validation (important even with client-side validation)
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, Email, and Message are required.' });
    }

    // Configure your email transporter using Nodemailer.
    // YOU MUST REPLACE THESE WITH YOUR OWN SMTP DETAILS AND SECURELY STORE THEM AS ENVIRONMENT VARIABLES IN VERCEL.
    // Example using Gmail (less secure for production without app passwords):
    // For production, consider using a dedicated email service like SendGrid, Mailgun, AWS SES, etc.
    // Get these from Vercel Environment Variables:
    // SMTP_HOST, SMTP_PORT, SMTP_USER (your sending email), SMTP_PASS (app password/API key)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com', // e.g., 'smtp.gmail.com' for Gmail, 'smtp-relay.sendgrid.net' for SendGrid
        port: parseInt(process.env.SMTP_PORT || '587', 10), // e.g., 587 for TLS, 465 for SSL
        secure: process.env.SMTP_PORT === '465', // Use true for 465, false for other ports like 587
        auth: {
            user: process.env.SMTP_USER, // Your sending email address (e.g., 'your_email@gmail.com')
            pass: process.env.SMTP_PASS  // Your email password or app-specific password/API key
        },
        tls: {
            // Do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // Define the email content.
    const mailOptions = {
        from: process.env.SMTP_USER, // Sender address (must be the same as SMTP_USER if using simple SMTP)
        to: 'YOUR_RECEIVING_EMAIL@example.com', // <--- REPLACE THIS with YOUR email address to receive messages
        subject: `New Enquiry from AV Tutorial Website - ${name}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
            <p><strong>Interested Course:</strong> ${course || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <br>
            <p>This message was sent from the AV Tutorial website contact form.</p>
        `,
    };

    try {
        // Send the email.
        await transporter.sendMail(mailOptions);
        // If successful, send a success response to the frontend.
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        // If there's an error sending the email, log it and send an error response.
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message.', error: error.message });
    }
};
