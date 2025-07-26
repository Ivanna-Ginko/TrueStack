import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { createArticleController, deleteArticleController, getArticleByIdController, getArticlesController, patchArticleController } from '../controllers/articles.js';
import { createArticleSchema, updateArticleSchema } from '../validation/articles.js';
import { validateBody } from "../middlewares/validateBody.js";
import { isValidIdArticles } from '../middlewares/isValidIdArticles.js';
import { authenticate } from '../middlewares/authenticate.js';



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
	authenticate,
	validateBody(createArticleSchema),
	ctrlWrapper(createArticleController)
);
router.patch(
	'/:articleId',
	isValidIdArticles,
	authenticate,
	validateBody(updateArticleSchema),
	ctrlWrapper(patchArticleController)
);
router.delete(
	'/:articleId',
	isValidIdArticles,
	authenticate,
	ctrlWrapper(deleteArticleController)
);




export default router;
