import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createArticleController, getArticleByIdController, getArticlesController } from '../controllers/articles.js';

const router = Router();

router.get(
	'/',
	ctrlWrapper(getArticlesController)
);
router.get(
	'/:articleId',
	ctrlWrapper(getArticleByIdController)
);
router.post(
	'/',
	ctrlWrapper(createArticleController));

router.patch('/:articleId', getArticlesController);
router.delete('/:articleId', getArticlesController);

export default router;
