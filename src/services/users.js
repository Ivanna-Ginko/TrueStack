import { ArticlesCollection } from '../db/models/articles.js';
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
  const res = await UsersCollection.updateOne(
    { _id: userId, savedArticles: { $ne: articleId } },
    { $push: { savedArticles: articleId } },
  );

  const added = res.modifiedCount === 1;

  const user = await UsersCollection.findById(userId).select('_id');
  if (!user) return { user: null, article: null, added: false };

  const article = await ArticlesCollection.findById(articleId)
    .select('title img category author date desc rate')
    .lean();

  return { user, article, added };
};
