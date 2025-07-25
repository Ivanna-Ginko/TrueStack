import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default: null,
    },
    articlesAmount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const UsersCollection = model('user', UserSchema);
