import { SORT_ORDER_ART } from '../constants/articles.js';
import { ArticlesCollection } from '../db/models/articles.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllArticles = async ({
  page = 1,
  perPage = 12,
  sortOrder = SORT_ORDER_ART.DESC,
  sortBy = 'createdAt',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const articlesQuery = ArticlesCollection.find(filter);
  const articlesCount = await ArticlesCollection.find()
    .merge(articlesQuery)
    .countDocuments();

  const articles = await articlesQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(articlesCount, perPage, page);

  return {
    data: articles,
    ...paginationData,
  };
};

export const getArticleById = async (articleId) => {
  const article = await ArticlesCollection.findById(articleId);
  return article;
};

// далі приватні
export const createArticle = async (payload, ownerId) => {
  const article = await ArticlesCollection.create({ ...payload, ownerId });
  return article;
};

export const updateArticle = async (articleId, payload, ownerId) => {
  const rawResult = await ArticlesCollection.findOneAndUpdate(
    { _id: articleId, ownerId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    article: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteArlicle = async (articleId, ownerId) => {
  const article = await ArticlesCollection.findOneAndDelete({
    _id: articleId,
    ownerId,
  });
  return article;
};

export const updateRate = async (articleId, delta) => {
  return ArticlesCollection.findByIdAndUpdate(
    articleId,
    { $inc: { rate: delta } },
    { new: true },
  );
};

// await updateRate(articleId, +1); // при збереженні
// await updateRate(articleId, -1); // при видаленні збереження
