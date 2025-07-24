import { Router } from 'express';
import { getArticlesController } from '../controllers/articles.js';

const authRouter = Router();

authRouter.post( '/register', getArticlesController);
authRouter.post( '/login', getArticlesController);
authRouter.post('/logout', getArticlesController);
authRouter.post('/refresh', getArticlesController);


export default authRouter;
