import { ArticlesCollection } from '../db/models/articles.js';

export const getAllArticles = async () => {
  const articles = await ArticlesCollection.find();
  return articles;
};
