import { Router } from 'express';

import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';

import { loginUserSchema } from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

// router.post('/logout', getArticlesController);
// router.post('/refresh', getArticlesController);

export default router;
