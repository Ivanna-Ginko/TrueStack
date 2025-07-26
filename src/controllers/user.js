import {
  getAllUsers,
  getSavedArticlesOfUser,
  getUserById,
} from '../services/users.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getUsersController = async (req, res, next) => {
  const users = await getAllUsers();

  res.json({
    status: 200,
    message: 'Successfully found users',
    data: users,
  });
};

export const getUserByIdController = async (req, res, next) => {
  const { userId } = req.params;
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
  const { _id: userId } = req.user;

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const result = await getSavedArticlesOfUser({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found saved articles',
    data: result,
  });
};
