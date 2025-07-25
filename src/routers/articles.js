import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createArticleController, deleteArticleController, getArticleByIdController, getArticlesController, patchArticleController } from '../controllers/articles.js';
import { createArticleSchema, updateArticleSchema } from '../validation/articles.js';
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get(
	'/',
	ctrlWrapper(getArticlesController)
);
router.get(
	'/:articleId',
	isValidId,
	ctrlWrapper(getArticleByIdController)
);
router.post(
	'/',
	validateBody(createArticleSchema),
	ctrlWrapper(createArticleController)
);
router.patch(
	'/:articleId',
	isValidId,
	validateBody(updateArticleSchema),
	ctrlWrapper(patchArticleController)
);
router.delete(
	'/:articleId',
	isValidId,
	ctrlWrapper(deleteArticleController)
);

export default router;
