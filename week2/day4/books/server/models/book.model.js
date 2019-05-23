const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * export class Book {
  id: number;
  title: string;
  author: string;
  year: number;
  pages: number;
  publisher: string;
}

*/

const BookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required!'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Provide an author'],
      trim: true,
    },
    year: Number,
    pages: {
      type: Number,
      min: [1, 'Moar paages!!!'],
    },
    publisher: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Book', BookSchema);
