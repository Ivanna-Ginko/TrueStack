import { Router } from 'express';
import { getArticlesController } from '../controllers/articles.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', getArticlesController);
router.get('/favouritearticles', authenticate, getArticlesController);
router.get('/postedarticles', getArticlesController);
router.put('/savearticle', authenticate, getArticlesController);
router.delete('/deletefavourite', authenticate, getArticlesController);

export default router;
