import { ArticlesCollection } from '../db/models/articles.js';

export const getAllArticles = async () => {
  const articles = await ArticlesCollection.find();
  return articles;
};

export const getArticleById = async (articleId) => {
  const article = await ArticlesCollection.findById(articleId);
  return article;
};
