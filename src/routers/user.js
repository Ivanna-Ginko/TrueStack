import { Router } from 'express';
import {
  getCreatedArticlesOfUserController,
  getUserByIdController,
  getUsersController,
} from '../controllers/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
// import { authenticate } from '../middlewares/authenticate.js';

const router = Router();

router.get('/', ctrlWrapper(getUsersController));
router.get(
  '/created-articles',
  // authenticate,
  ctrlWrapper(getCreatedArticlesOfUserController),
);

router.get('/:userId', isValidId, ctrlWrapper(getUserByIdController));

export default router;
