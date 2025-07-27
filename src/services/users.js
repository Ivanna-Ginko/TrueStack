import { UsersCollection } from '../db/models/user.js';
// import { ArticlesCollection } from '../db/models/articles.js';
import createHttpError from 'http-errors';

export const getAllUsers = async () => {
  const users = await UsersCollection.find();
  return users;
};

export const getUserById = async (userId) => {
  const user = await UsersCollection.findById(userId);
  return user;
};

export const removeArticleFromSaved = async (userId, articleId) => {
  const result = await UsersCollection.updateOne(
    { _id: userId },
    { $pull: { savedArticles: articleId } },
  );

  if (result.modifiedCount === 0) {
    throw createHttpError(404, 'Article not found in saved list');
  }

  return true;
};
