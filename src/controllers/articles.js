// src/controllers/articles.js

import createHttpError from 'http-errors';
import { getAllArticles, getArticleById } from '../services/articles.js';

export const getArticlesController = async (req, res, next) => {
  const articles = await getAllArticles();
  res.json({
    status: 200,
    message: 'Successfully found articles!',
    data: articles,
  });
};

export const getArticleByIdController = async (req, res, next) => {
	const {articleId}  = req.params;
	const article = await getArticleById(articleId);

	if (!article) {
		throw createHttpError(404, 'Article not found');
	}

	res.json({
		status:200,
		message: `Successfully found article!`,
		data: article,
	});
};

export const createArticleController = async (req, res) => {

};
