import User from "../models/user.js";
import createHttpError from "http-errors";
import { sendEmail } from "../utils/email.js"; // уявний модуль для відправки електронних листів

// Функція для запиту токена для скидання пароля
export const requestResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = generateResetToken(); // уявна функція для генерації токена

  // Збереження токена в базі даних (приклад)
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 година
  await user.save();

  // Відправка електронного листа з токеном
  const resetUrl = `http://yourapp.com/reset-password?token=${resetToken}`;
  const message = `You requested a password reset. Please make a PUT request to: \n\n ${resetUrl}`;

  await sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    text: message,
  });
};

// Інші функції...
export const resetPassword = async (data) => {
  // логіка скидання пароля
};
