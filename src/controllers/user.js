import {
  getAllUsers,
  getCreatedArticlesOfUser,
  getSavedArticlesOfUser,
  getUserById,
  addArticleToSaved,
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

export const addArticleToSavedController = async (req, res) => {
  // delete stub after auth implementation
  const userId = req.user?._id || '6881563901add19ee16fcff2';
  const { articleId } = req.body;

  if (!articleId) {
    return res
      .status(400)
      .json({ status: 400, message: 'ArticleId is required' });
  }

  const { user, article, added } = await addArticleToSaved({
    userId,
    articleId,
  });

  if (!user) {
    return res.status(404).json({ status: 404, message: 'User not found' });
  }

  if (!article) {
    return res.status(404).json({ status: 404, message: 'Article not found' });
  }

  return res.status(200).json({
    status: 200,
    message: added
      ? 'Article added to saved articles successfully'
      : 'Article is already in saved articles',
    data: {
      added,
      article,
    },
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
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    status: 200,
    message: 'Successfully found saved articles',
    data: result,
  });
};

export const getCreatedArticlesOfUserController = async (req, res) => {
  // change after auth implementation
  const userId = req.user?._id || '6881563901add19ee16fcff2';

  const { page, perPage } = parsePaginationParams(req.query);
  const filter = parseFilterParams(req.query);

  const result = await getCreatedArticlesOfUser({
    userId,
    page,
    perPage,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found created articles',
    data: result,
  });
};
