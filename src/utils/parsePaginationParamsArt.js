// src/utils/parsePaginationParamsArt.js

const parseNumber = (number, defaultValue) => {
	const parsedNumber = parseInt(number);
	if(Number.isNaN(parsedNumber)) return defaultValue;
	return parsedNumber;
};

export const parsePaginationParamsArt = (query) => {
	const {page, perPage} = query;

	const parsedPage = parseNumber(page, 1);
	const parsedPerPage = parseNumber(perPage, 12);

	return {
		page: parsedPage,
		perPage: parsedPerPage,
	};
};
