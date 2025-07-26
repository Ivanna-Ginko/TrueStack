// src/utils/calculatePaginationData.js

export const calculatePaginationData = (count, perPage, page) => {
  const totalPage = Math.ceil(count / perPage);
  const hasPreviousPage = page !== 1;
  const hasNextPage = Boolean(totalPage - page);

  return {
    page,
    perPage,
    totalItems: count,
    totalPage,
    hasPreviousPage,
    hasNextPage,
  };
};
