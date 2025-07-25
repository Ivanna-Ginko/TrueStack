import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(32).trim().required(),
  email: Joi.string().email().max(64).trim().required(),
  password: Joi.string().min(8).max(64).required(),
});
