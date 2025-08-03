import {
  getAllUsers,
  getUserById,
  addArticleToSaved,
  removeArticleFromSaved,
  getCreatedArticlesOfUser,
  getSavedArticlesOfUser,
} from '../services/users.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllUsersController = async (req, res, next) => {
  let { page, perPage } = parsePaginationParams(req.query);

  if (!req.query.perPage) {
    perPage = 20;
  }

  const sortBy = req.query.sortBy || 'popularity';

  const { users, totalUsersCount } = await getAllUsers({
    page,
    perPage,
    sortBy,
  });

  const pagination = calculatePaginationData(totalUsersCount, perPage, page);

  res.status(200).json({
    status: 200,
    message: 'Successfully found users',
    data: users,
    pagination,
    meta: {
      sortBy,
      sortOptions: ['popularity', 'name', 'articlesAmount'],
      defaultSort: 'popularity',
    },
  });
};

export const getMe = async (req, res) => {
  res.json({
    status: 200,
    message: 'Successfully found user',
    data: req.user,
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
  const userId = req.user?._id;

  const { page, perPage } = parsePaginationParams(req.query);

  const result = await getSavedArticlesOfUser({
    userId,
    page,
    perPage,
  });

  if (result === null) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { items, ...pagination } = result;

  res.json({
    status: 200,
    message: 'Successfully found saved articles',
    data: items,
    pagination,
  });
};

export const getCreatedArticlesOfUserController = async (req, res, next) => {
  const userId = req.params.userId;

  if (!userId) {
    return res.status(400).json({
      status: 400,
      message: 'Missing userId',
    });
  }

  const { page, perPage } = parsePaginationParams(req.query);

  const result = await getCreatedArticlesOfUser({
    userId,
    page,
    perPage,
  });

  if (!result.items.length) {
    return res
      .status(404)
      .json({ message: 'There are no created articles by this user' });
  }

  const { items, ...pagination } = result;

  res.status(200).json({
    status: 200,
    message: 'Successfully found created articles',
    data: items,
    pagination,
  });
};

export const addArticleToSavedController = async (req, res) => {
  const userId = req.user?._id;
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

  if (!added) {
    return res.status(409).json({
      status: 409,
      message: 'Article is already in saved articles',
    });
  }

  return res.status(200).json({
    status: 200,
    message: 'Article added to saved articles successfully',
    data: user.savedArticles,
  });
};

export const removeArticleFromSavedController = async (req, res, next) => {
  const userId = req.user?._id;
  const { articleId } = req.params;

  const { savedArticleIds } = await removeArticleFromSaved(userId, articleId);

  if (!savedArticleIds || savedArticleIds.length === 0) {
    return res.status(204).send();
  }

  return res.status(200).json({
    status: 200,
    message: 'Article successfully removed from saved list',
    data: savedArticleIds,
  });
};
