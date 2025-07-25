// src/middlewares/isValidId.js

import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

export const isValidId = (req, res, next) => {
	const { articleId } = req.params;
	if (!isValidObjectId(articleId)) {
		throw createHttpError(400, 'Bad Request');
	}
	next();
};
