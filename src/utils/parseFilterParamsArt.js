// src/utils/parseFilterParamsArt.js

import mongoose from 'mongoose';

const parseOwnerId = (ownerId) => {
  if (!mongoose.Types.ObjectId.isValid(ownerId)) return;
  return new mongoose.Types.ObjectId(ownerId);
};

export const parseFilterParamsArt = (query) => {
  const { ownerId } = query;
  const filter = {};

  const parsedOwnerId = parseOwnerId(ownerId);
  if (parsedOwnerId) {
    filter.ownerId = parsedOwnerId;
  }

  return filter;
};
