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
