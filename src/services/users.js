import { ArticlesCollection } from '../db/models/articles.js';
import { UsersCollection } from '../db/models/user.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

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

export const getSavedArticlesOfUser = async ({
  userId,
  page = 1,
  perPage = 12,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const user = await UsersCollection.findById(userId).select('savedArticles');
  if (!user) return null;

  const articleIds = user.savedArticles || [];
  if (!articleIds.length) {
    return { items: [], ...calculatePaginationData(0, perPage, page) };
  }

  const articlesQuery = ArticlesCollection.find({ _id: { $in: articleIds } });

  if (filter.category) {
    articlesQuery.where('category').equals(filter.category);
  }
  if (filter.title) {
    articlesQuery.where('title').regex(new RegExp(filter.title, 'i'));
  }

  const [total, items] = await Promise.all([
    ArticlesCollection.countDocuments(articlesQuery.getFilter()),
    articlesQuery
      .skip(skip)
      .limit(perPage)
      .select('title img category author')
      .lean(),
  ]);

  return {
    items,
    ...calculatePaginationData(total, perPage, page),
  };
};

export const getCreatedArticlesOfUser = async ({
  userId,
  page = 1,
  perPage = 12,
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const query = { ownerId: userId };

  if (filter.category) {
    query.category = filter.category;
  }
  if (filter.title) {
    query.title = { $regex: new RegExp(filter.title, 'i') };
  }

  const total = await ArticlesCollection.countDocuments(query);

  const items = await ArticlesCollection.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(perPage)
    .select('title img category author date')
    .lean();

  return {
    items,
    ...calculatePaginationData(total, perPage, page),
  };
};
