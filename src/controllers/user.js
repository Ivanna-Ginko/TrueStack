import { getAllUsers, getUserById } from '../services/users.js';
import createHttpError from 'http-errors';
import { addArticleToSaved } from '../services/users.js';

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
