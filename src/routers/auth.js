import { Router } from "express";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from "../validation/auth.js";
import { registerUserController } from "../controllers/auth.js";
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema } from "../validation/auth.js";
import { loginUserController } from "../controllers/auth.js";
import { logoutUserController } from "../controllers/auth.js";
import { refreshUserSessionController } from "../controllers/auth.js";
import { requestResetEmailSchema } from "../validation/auth.js";
import { resetPasswordSchema } from "../validation/auth.js";
import { resetPasswordController } from "../controllers/auth.js";
import { sendResetEmailController } from "../controllers/auth.js"; // Новий імпорт

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

// Оновлений маршрут для відправки електронного листа для скидання пароля
router.post('/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(sendResetEmailController));

// Маршрут для скидання пароля
router.post('/reset-password', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default router;

