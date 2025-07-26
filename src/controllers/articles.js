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
import { parseFilterParamsArt } from '../utils/parseFilterParamsArt.js';
// import { UsersCollection } from '../db/models/user.js';

export const getArticlesController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParamsArt(req.query);
  const { sortOrder, sortBy } = parseSortParamsArt(req.query);
  const filter = parseFilterParamsArt(req.query);

  const articles = await getAllArticles({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
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
  const ownerId = req.user._id;

  const article = await createArticle({ ...req.body }, ownerId);

  // await UsersCollection.findByIdAndUpdate(ownerId, {
  // 	$inc: {articlesAmount: +1},
  // });

  res.status(201).json({
    status: 201,
    message: `Successfully created an article!`,
    data: article,
  });
};

export const patchArticleController = async (req, res) => {
  const { articleId } = req.params;


  const result = await updateArticle(
    articleId,
    { ...req.body },
    req.user._id,
  );

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
  const ownerId = req.user._id;

  const article = await deleteArlicle(articleId, ownerId);

  if (!article) {
    throw createHttpError(404, 'Article not found');
  }

  res.status(204).send();
};
