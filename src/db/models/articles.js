import { Schema, model } from 'mongoose';


const ArticleSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  img: {
    type: String,
    default: ''
  },
   userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  name: {
    type: String,
    required: true // автор
  },

  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: ''
  },
  article: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['popular', 'general'],
    default: 'popular'
  }
}, {
  timestamps: true,
  versionKey: false,

});

export const ArticlesCollection = model('Article', ArticleSchema);
