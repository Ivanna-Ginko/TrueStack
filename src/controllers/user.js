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

export const getUsersController = async (req, res, next) => {
  const users = await getAllUsers();

  res.json({
    status: 200,
    message: 'Successfully found users',
    data: users,
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

  res.json({
    status: 200,
    message: 'Successfully found saved articles',
    data: result,
  });
};

export const getCreatedArticlesOfUserController = async (req, res, next) => {
  console.log('userId from req.user:', req.user?._id);

  const userId = req.user?._id;

  const { page, perPage } = parsePaginationParams(req.query);

  const result = await getCreatedArticlesOfUser({
    userId,
    page,
    perPage,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found created articles',
    data: result,
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

  return res.status(200).json({
    status: 200,
    message: added
      ? 'Article added to saved articles successfully'
      : 'Article is already in saved articles',
    data: {
      added,
      article,
      savedArticles: user.savedArticles,
    },
  });
};

export const removeArticleFromSavedController = async (req, res, next) => {
  const userId = req.user?._id;
  const { articleId } = req.params;

  const { savedArticleIds } = await removeArticleFromSaved(userId, articleId);

  if (savedArticleIds.length === 0) {
    return res.status(204).send();
  }

  res.status(200).json({ savedArticleIds });
};
