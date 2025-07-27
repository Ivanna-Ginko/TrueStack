import { Router } from 'express';
import {
  addArticleToSavedController,
  getSavedArticlesOfUserController,
  getCreatedArticlesOfUserController,
  getUserByIdController,
  getUsersController,
  removeArticleFromSavedController,
} from '../controllers/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { isValidIdArticles } from '../middlewares/isValidIdArticles.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));

router.post(
  '/saved-articles/add-article',
  authenticate,
  ctrlWrapper(addArticleToSavedController),
);

router.get(
  '/created-articles',
  authenticate,
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
