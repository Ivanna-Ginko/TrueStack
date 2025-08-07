import { ArticlesCollection } from '../db/models/articles.js';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { updateRate } from './articles.js';
import mongoose from 'mongoose';

export const getAllUsers = async ({
  page = 1,
  perPage = 20,
  sortBy = 'popularity',
}) => {
  const skip = (page - 1) * perPage;

  const sortFieldsMap = {
    popularity: { totalRate: -1 },
    name: { name: 1 },
    articlesAmount: { articlesAmount: -1 },
  };

  const sortOptions = sortFieldsMap[sortBy] || sortFieldsMap.popularity;

  const aggregationPipeline = [
    {
      $lookup: {
        from: 'articles',
        localField: '_id',
        foreignField: 'ownerId',
        as: 'articles',
      },
    },
    {
      $addFields: {
        totalRate: { $sum: '$articles.rate' },
        articlesAmount: { $size: '$articles' },
      },
    },
    {
      $match: {
        articlesAmount: { $gt: 0 },
      },
    },
    {
      $project: {
        name: 1,
        avatarUrl: 1,
        articlesAmount: 1,
        totalRate: { $ifNull: ['$totalRate', 0] },
      },
    },
    {
      $sort: sortOptions,
    },
    {
      $skip: skip,
    },
    {
      $limit: perPage,
    },
  ];

  const users = await UsersCollection.aggregate(aggregationPipeline);

  const totalUsersCount = await UsersCollection.countDocuments();

  return { users, totalUsersCount };
};

export const getUserById = async (userId) => {
  const user = await UsersCollection.findById(userId).select(
    'name email avatarUrl',
  );
  return user;
};

export const getSavedArticlesOfUser = async ({
  userId,
  page = 1,
  perPage = 12,
}) => {
  const skip = (page - 1) * perPage;

  const user = await UsersCollection.findById(userId).select('savedArticles');
  if (!user) return null;

  const articleIds = user.savedArticles || [];
  if (!articleIds.length) {
    return { items: [], ...calculatePaginationData(0, perPage, page) };
  }

  const articlesQuery = ArticlesCollection.find({ _id: { $in: articleIds } });

  const [total, items] = await Promise.all([
    ArticlesCollection.countDocuments(articlesQuery.getFilter()),
    articlesQuery
      .skip(skip)
      .limit(perPage)
      .select('title img author article')
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
}) => {
  const skip = (page - 1) * perPage;

  const query = { ownerId: new mongoose.Types.ObjectId(userId) };

  const total = await ArticlesCollection.countDocuments(query);

  const items = await ArticlesCollection.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(perPage)
    .select('title img author')
    .lean();

  return {
    items,
    ...calculatePaginationData(total, perPage, page),
  };
};

export const addArticleToSaved = async ({ userId, articleId }) => {
  const res = await UsersCollection.updateOne(
    { _id: userId, savedArticles: { $ne: articleId } },
    { $push: { savedArticles: articleId } },
  );

  const added = res.modifiedCount === 1;

  if (added) {
    await updateRate(articleId, +1);
  }

  const user = await UsersCollection.findById(userId)
    .select('_id savedArticles')
    .lean();

  if (!user) return { user: null, article: null, added: false };

  const article = await ArticlesCollection.findById(articleId)
    .select('title img author')
    .lean();

  return { user, article, added };
};

export const removeArticleFromSaved = async (userId, articleId) => {
  const user = await UsersCollection.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const wasSaved = user.savedArticles.includes(articleId);

  if (!wasSaved) {
    throw createHttpError(404, 'Article not found in saved list');
  }

  user.savedArticles.pull(articleId);
  await user.save();

  await updateRate(articleId, -1);

  return { savedArticleIds: user.savedArticles };
};
