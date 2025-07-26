import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createArticleController, deleteArticleController, getArticleByIdController, getArticlesController, patchArticleController } from '../controllers/articles.js';
import { createArticleSchema, updateArticleSchema } from '../validation/articles.js';
import { validateBody } from "../middlewares/validateBody.js";
import { isValidIdArticles } from '../middlewares/isValidIdArticles.js';

const router = Router();

router.get(
	'/',
	ctrlWrapper(getArticlesController)
);
router.get(
	'/:articleId',
	isValidIdArticles,
	ctrlWrapper(getArticleByIdController)
);
router.post(
	'/',
	validateBody(createArticleSchema),
	ctrlWrapper(createArticleController)
);
router.patch(
	'/:articleId',
	isValidIdArticles,
	validateBody(updateArticleSchema),
	ctrlWrapper(patchArticleController)
);
router.delete(
	'/:articleId',
	isValidIdArticles,
	ctrlWrapper(deleteArticleController)
);

export default router;
