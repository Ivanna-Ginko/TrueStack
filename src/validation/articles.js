// src/validation/articles.js

import Joi from 'joi';

export const createArticleSchema = Joi.object({
  img: Joi.string().uri().required(),
  title: Joi.string().min(3).max(48).required(),
  article: Joi.string().min(100).max(4000).required(),
  author: Joi.string().min(2).max(50).required(),
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
});

export const updateArticleSchema = Joi.object({
  img: Joi.string().uri(),
  title: Joi.string().min(3).max(48),
  article: Joi.string().min(100).max(4000),
  author: Joi.string().min(2).max(50),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/),
});

export const addArticleToSavedSchema = Joi.object({
  articleId: Joi.string().hex().length(24).required(),
});
