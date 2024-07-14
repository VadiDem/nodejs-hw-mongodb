import Joi from 'joi';

export const emailSchema = Joi.object({
  to: Joi.string().email().required(),
  subject: Joi.string().required(),
  text: Joi.string().optional(),
  html: Joi.string().optional(),
});
