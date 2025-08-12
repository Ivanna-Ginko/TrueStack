import Joi from 'joi';

// const pattern =
//   /^[a-z0-9]+(?:[.-_'+][a-z0-9]+)*@([a-z0-9]+(?:[-][a-z0-9]+)*.)+[a-z]{2,}$/;

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(32).trim().required(),
  email: Joi.string().email().max(64).trim().required(),
  password: Joi.string().min(8).max(64).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
