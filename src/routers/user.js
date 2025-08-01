import { Router } from 'express';
import {
  addArticleToSavedController,
  getSavedArticlesOfUserController,
  getCreatedArticlesOfUserController,
  getUserByIdController,
  getUsersController,
  removeArticleFromSavedController,
  getMe,
  getTopUsersByArticlesRatingController,
} from '../controllers/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { isValidIdArticles } from '../middlewares/isValidIdArticles.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { addArticleToSavedSchema } from '../validation/articles.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));

router.get('/me', authenticate, ctrlWrapper(getMe));

router.get(
  '/top-by-articles-rating',
  ctrlWrapper(getTopUsersByArticlesRatingController),
);

router.post(
  '/saved-articles/add-article',
  authenticate,
  validateBody(addArticleToSavedSchema),
  ctrlWrapper(addArticleToSavedController),
);

router.get(
  '/created-articles',
  ctrlWrapper(getCreatedArticlesOfUserController),
);

router.get(
  '/saved-articles',
  authenticate,
  ctrlWrapper(getSavedArticlesOfUserController),
);

router.delete(
  '/saved-articles/:articleId',
  isValidIdArticles,
  authenticate,
  ctrlWrapper(removeArticleFromSavedController),
);

router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

export default router;
