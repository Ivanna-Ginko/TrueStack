import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: null
  },
  articlesAmount: {
    type: Number,
    default: null
  }

});

module.exports = model('User', UserSchema);
