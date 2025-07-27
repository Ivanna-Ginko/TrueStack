import { Router } from 'express';
import {
  getUserByIdController,
  getUsersController,
  removeArticleFromSavedController,
} from '../controllers/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { isValidIdArticles } from '../middlewares/isValidIdArticles.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));

router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

router.delete(
  '/saved-articles/:articleId',
  isValidIdArticles,
  // authenticate,
  ctrlWrapper(removeArticleFromSavedController),
);

export default router;
