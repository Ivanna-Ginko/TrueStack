import { ArticlesCollection } from '../db/models/articles.js';

export const getAllArticles = async () => {
  const articles = await ArticlesCollection.find();
  return articles;
};

export const getArticleById = async (articleId) => {
  const article = await ArticlesCollection.findById(articleId);
  return article;
};

// далі приватні
export const createArticle = async (payload) => {
  const article = await ArticlesCollection.create(payload);
  return article;
};

export const updateArticle = async (articleId, payload) => {
  const rawResult = await ArticlesCollection.findOneAndUpdate(
    {_id: articleId},
    payload,
    {
      new: true,
      includeResultMetadata: true,
    }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    article: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteArlicle = async (articleId) => {
  const article = await ArticlesCollection.findOneAndDelete({
    _id: articleId,
  });
  return article;
};
