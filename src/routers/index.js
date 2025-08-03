import { Router } from 'express';
import authRouter from './auth.js';
import articlesRouter from './articles.js';
import userRouter from './user.js';

const router = Router();

router.use('/articles', articlesRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;
