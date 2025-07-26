import { Router } from 'express';
import {
  getSavedArticlesOfUserController,
  getUserByIdController,
  getUsersController,
} from '../controllers/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));

router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

router.get('/saved-articles', ctrlWrapper(getSavedArticlesOfUserController));

export default router;
