import { Router } from 'express';
import {
  addArticleToSavedController,
  getUserByIdController,
  getUsersController,
} from '../controllers/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
// import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));

router.post(
  '/saved-articles/add-article',
  // authenticate,
  ctrlWrapper(addArticleToSavedController),
);

router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

export default router;
