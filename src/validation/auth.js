import Joi from "joi";

// Схема валідації для реєстрації користувача
export const registerUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Схема валідації для авторизації користувача
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Схема валідації для запиту електронного листа для скидання пароля
export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Схема валідації для скидання пароля
export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});
