import {
  getAllUsers,
  getSavedArticlesOfUser,
  getUserById,
} from '../services/users.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getUsersController = async (req, res, next) => {
  const users = await getAllUsers();

  res.json({
    status: 200,
    message: 'Successfully found users',
    data: users,
  });
};

export const getUserByIdController = async (req, res, next) => {
  const { _id: userId } = req.params;
  const user = await getUserById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.json({
    status: 200,
    message: `Successfully found user with id ${userId}`,
    data: user,
  });
};

export const getSavedArticlesOfUserController = async (req, res, next) => {
  // change after auth implementation:
  const userId = req.user?._id || '6881563901add19ee16fcff2';
  // const { _id: userId } = req.user;

  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);

  const result = await getSavedArticlesOfUser({
    userId,
    page,
    perPage,
    filter,
  });

  if (result === null) {
    return res.status(404).json({ message: ' User not found' });
  }

  res.json({
    status: 200,
    message: 'Successfully found saved articles',
    data: result,
  });
};
