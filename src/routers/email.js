import { Router } from 'express';
import { sendEmailController } from '../controllers/email.js';
import { validateBody } from '../middlewares/validateBody.js';
import { emailSchema } from '../validation/email.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post('/send', validateBody(emailSchema), ctrlWrapper(sendEmailController));

export default router;
