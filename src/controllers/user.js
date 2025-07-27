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
  // change after auth implement
  const userId = req.user?._id || '6881563901add19ee16fcff2';
  const { articleId } = req.body;

  if (!articleId) {
    return res
      .status(400)
      .json({ status: 400, message: 'ArticleId is required' });
  }

  const updatedUser = await addArticleToSaved({ userId, articleId });

  if (!updatedUser) {
    return res.status(404).json({ status: 404, message: 'User not found' });
  }

  res.status(200).json({
    status: 200,
    message: 'Article added to saved articles successfully',
    data: updatedUser.savedArticles,
  });
};
