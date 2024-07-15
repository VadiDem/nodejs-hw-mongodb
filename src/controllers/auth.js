import { registerUser } from "../services/auth.js";
import { loginUser } from "../services/auth.js";
import { ONE_DAY } from "../constants/index.js";
import { refreshUsersSession } from "../services/auth.js";
import { logoutUser } from "../services/auth.js";
import { requestResetToken } from "../services/auth.js";
import { resetPassword } from "../services/auth.js";
import createHttpError from 'http-errors';

// Функція для реєстрації користувача
export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

// Функція для авторизації користувача
export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// Функція для виходу користувача з системи
export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

// Функція для налаштування сесії
const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

// Функція для оновлення сесії користувача
export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// Функція для відправки електронного листа для скидання пароля
export const sendResetEmailController = async (req, res, next) => {
  const { email } = req.body;
  try {
    await requestResetToken(email);
    res.status(200).json({
      status: 200,
      message: 'Reset email sent successfully',
      data: {},
    });
  } catch (error) {
    next(createHttpError(500, 'Failed to send reset email'));
  }
};

// Функція для скидання пароля
export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);
  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};
