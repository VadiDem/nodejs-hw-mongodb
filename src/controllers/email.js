import { sendEmail } from '../utils/sendMail.js';
import createHttpError from 'http-errors';

export const sendEmailController = async (req, res, next) => {
  const { to, subject, text, html } = req.body;

  try {
    await sendEmail({ to, subject, text, html });
    res.status(200).json({
      status: 200,
      message: 'Email sent successfully',
    });
  } catch (error) {
    next(createHttpError(500, 'Failed to send email'));
  }
};
