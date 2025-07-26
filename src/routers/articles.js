import { Router } from 'express';
import { getArticlesController } from '../controllers/articles.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', getArticlesController);
router.get('/:articleId', getArticlesController);
router.post('/', authenticate, getArticlesController);
router.patch('/:articleId', authenticate, getArticlesController);
router.delete('/:articleId', authenticate, getArticlesController);

export default router;
