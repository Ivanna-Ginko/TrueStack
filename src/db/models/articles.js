// src/db/models/articles.js
import { Schema, model } from 'mongoose';

const articlesSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    },
    author: {
      type: String,
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    date: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ArticlesCollection = model('Article', articlesSchema);
