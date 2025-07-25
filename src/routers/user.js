import { Router } from 'express';
import {
  getUserByIdController,
  getUsersController,
} from '../controllers/user.js';

const router = Router();

router.get('/users', getUsersController);

router.get('/users/:userId', getUserByIdController);

export default router;
