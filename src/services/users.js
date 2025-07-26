import { UsersCollection } from '../db/models/user.js';
import { ArticlesCollection } from '../db/models/articles.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllUsers = async () => {
  const users = await UsersCollection.find();
  return users;
};

export const getUserById = async (userId) => {
  const user = await UsersCollection.findById(userId);
  return user;
};

export const getCreatedArticlesOfUser = async ({
  userId,
  page = 1,
  perPage = 12,
  sortBy = '_id',
  sortOrder = 'desc',
  filter = {},
}) => {
  const skip = (page - 1) * perPage;

  const baseFilter = { ownerId: userId };

  if (filter.title) {
    baseFilter.title = { $regex: new RegExp(filter.title, 'i') };
  }
  if (filter.category) {
    baseFilter.category = filter.category;
  }

  const query = ArticlesCollection.find(baseFilter);

  const [total, items] = await Promise.all([
    ArticlesCollection.countDocuments(baseFilter),
    query
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .skip(skip)
      .limit(perPage)
      .lean(),
  ]);

  return {
    items,
    ...calculatePaginationData(total, perPage, page),
  };
};
