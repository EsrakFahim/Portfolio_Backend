import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE, // Use mail.privateemail.com for Namecheap
      port: process.env.EMAIL_PORT, // Use 465 for SSL or 587 for TLS
      secure: process.env.EMAIL_SECURE === "true", // Use true for SSL, false for TLS
      auth: {
            user: process.env.EMAIL_ACCOUNT, // Your Namecheap email
            pass: process.env.EMAIL_PASSWORD,
      },
});
