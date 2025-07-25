import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createArticleController, deleteArticleController, getArticleByIdController, getArticlesController, patchArticleController } from '../controllers/articles.js';

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
	ctrlWrapper(createArticleController)
);
router.patch(
	'/:articleId',
	ctrlWrapper(patchArticleController)
);
router.delete(
	'/:articleId',
	ctrlWrapper(deleteArticleController)
);

export default router;
