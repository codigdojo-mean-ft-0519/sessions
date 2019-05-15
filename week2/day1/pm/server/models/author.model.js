console.log('loading author model');

const mongoose = require('mongoose');
const { Schema } = mongoose;
// equivalent to above line
// const Schema = mongoose.Schema;


const AuthorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide an author name'],
    trim: true,
  },
  age: {
    type: Number,
    min: [5, 'So young'],
    required: true,
  },
  isAlive: {
    type: Boolean,
  },
  // nesting books inside authors
  // books: [BookSchema]

  books: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]

  // created_at: Date,
  // updatedAt: Date
}, {
    timestamps: true
  });

  // register schemas to create Models
  // automatically lowercase and pluralize :: Author => authors 
module.exports = mongoose.model('Author', AuthorSchema);
