// src/middlewares/isValidIdArticles.js

import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidIdArticles = (req, res, next) => {
	const { articleId } = req.params;
	if (!isValidObjectId(articleId)) {
		throw createHttpError(400, 'Bad Request');
	}
	next();
};
