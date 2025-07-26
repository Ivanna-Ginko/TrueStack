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

export const getSavedArticlesOfUser = async ({
  userId,
  page = 1,
  perPage = 12,
  sortBy = '_id',
  sortOrder = 'desc',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const user = await UsersCollection.findById(userId).select('savedArticles');
  if (!user) return null;

  const articleIds = user.savedArticles;
  if (!articleIds?.length) {
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
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
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
