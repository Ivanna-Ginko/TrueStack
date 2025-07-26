// src/controllers/articles.js

import createHttpError from 'http-errors';
import {
  createArticle,
  deleteArlicle,
  getAllArticles,
  getArticleById,
  updateArticle,
} from '../services/articles.js';
import { parsePaginationParamsArt } from '../utils/parsePaginationParamsArt.js';
import { parseSortParamsArt } from '../utils/parseSortParamsArt.js';

export const getArticlesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParamsArt(req.query);

	const {sortOrder, sortBy} = parseSortParamsArt(req.query);

  const articles = await getAllArticles({
		page,
		perPage,
		sortBy,
		sortOrder,
	});

  res.json({
    status: 200,
    message: 'Successfully found articles!',
    data: articles,
  });
};

export const getArticleByIdController = async (req, res, next) => {
  const { articleId } = req.params;
  const article = await getArticleById(articleId);

  if (!article) {
    throw createHttpError(404, 'Article not found');
  }

  res.json({
    status: 200,
    message: `Successfully found article!`,
    data: article,
  });
};

export const createArticleController = async (req, res) => {
  const article = await createArticle(req.body);

  res.json({
    status: 201,
    message: `Successfully created an article!`,
    data: article,
  });
};

export const patchArticleController = async (req, res) => {
  const { articleId } = req.params;
  const result = await updateArticle(articleId, req.body);

  if (!result) {
    throw createHttpError(404, 'Article not found');
  }

  res.json({
    status: 200,
    message: `Successfully patched an article`,
    data: result.article,
  });
};

export const deleteArticleController = async (req, res) => {
  const { articleId } = req.params;

  const article = await deleteArlicle(articleId);

  if (!article) {
    throw createHttpError(404, 'Article not found');
  }

  res.status(204).send();
};
