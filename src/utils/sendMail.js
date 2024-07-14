import nodemailer from 'nodemailer';
import { env } from './env.js';

export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: env('SMTP_HOST'),
    port: env('SMTP_PORT'),
    secure: false,
    auth: {
      user: env('SMTP_USER'),
      pass: env('SMTP_PASSWORD'),
    },
  });

  const mailOptions = {
    from: env('SMTP_FROM'),
    to,
    subject,
    text,
    html,
  };

  await transporter.sendMail(mailOptions);
};
