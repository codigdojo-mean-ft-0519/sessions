console.log('loading book model');

const mongoose = require('mongoose');

const { Schema } = mongoose;

const BookSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Provide a book title'],
    trim: true,
    index: true,
  },
  pages: {
    type: Number,
    min: [1, 'more pages'],
    required: true,
  },
  publisher: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  }
});

module.exports = mongoose.model('Book', BookSchema);
