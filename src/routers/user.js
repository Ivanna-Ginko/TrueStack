import { Router } from 'express';
import {
  getUserByIdController,
  getUsersController,
  removeArticleFromSavedController,
} from '../controllers/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));

router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

router.delete(
  '/saved-articles/:articleId',
  isValidId,
  // authenticate,
  ctrlWrapper(removeArticleFromSavedController),
);

export default router;
