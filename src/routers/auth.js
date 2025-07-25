import { Router } from 'express';
import { getArticlesController } from '../controllers/articles.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);
router.post('/login', getArticlesController);
router.post('/logout', getArticlesController);
router.post('/refresh', getArticlesController);

export default router;
