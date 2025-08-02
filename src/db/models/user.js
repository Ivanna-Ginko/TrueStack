import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: null,
  },
  articlesAmount: {
    type: Number,
    default: null,
  },
  savedArticles: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    },
  ],
});

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('User', UserSchema);
