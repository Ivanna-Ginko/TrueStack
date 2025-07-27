import { UsersCollection } from '../db/models/user.js';

export const getAllUsers = async () => {
  const users = await UsersCollection.find();
  return users;
};

export const getUserById = async (userId) => {
  const user = await UsersCollection.findById(userId);
  return user;
};

export const addArticleToSaved = async ({ userId, articleId }) => {
  const updatedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    { $addToSet: { savedArticles: articleId } },
    { new: true },
  );

  if (!updatedUser) {
    return null;
  }

  return updatedUser;
};
