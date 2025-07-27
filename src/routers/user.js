import { Router } from 'express';
import {
  getSavedArticlesOfUserController,
  getUserByIdController,
  getUsersController,
} from '../controllers/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));

router.get(
  '/saved-articles',
  authenticate,
  ctrlWrapper(getSavedArticlesOfUserController),
);
router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

export default router;
