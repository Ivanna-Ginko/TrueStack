// src/utils/parseSortParamsArt.js

import { SORT_ORDER_ART } from "../constants/articles.js";

const parseSortOrder = (sortOrder) => {
	const isKnownOrder = [SORT_ORDER_ART.ASC, SORT_ORDER_ART.DESC].includes(sortOrder);
	if (isKnownOrder) return sortOrder;

	return SORT_ORDER_ART.DESC;
};

const parseSortBy = (sortBy) => {
	const keysOfArticle = [
		'rate',
		'createdAt',
	];

	if (keysOfArticle.includes(sortBy)) {
		return sortBy;
	}

	return 'createdAt';
};

export const parseSortParamsArt = (query) => {
	const {sortOrder, sortBy} = query;

	const parsedSortOrder = parseSortOrder(sortOrder);
	const parsedSortBy = parseSortBy(sortBy);

	return {
		sortOrder: parsedSortOrder,
		sortBy: parsedSortBy,
	};
};
