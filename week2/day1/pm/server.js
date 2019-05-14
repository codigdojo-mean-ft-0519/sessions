const parser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');

// const port = process.env.PORT || 8000;
// const { PORT: port = 8000 } = process.env;
const { env: { PORT: port = 8000 } } = process;
const { Schema } = mongoose;
const app = express();

// express settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// express middleware
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// mongoose connection setup
mongoose.connect('mongodb://localhost/authors_and_books', {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on('connected', () => console.log('Connected to Mongo'));


// schema setup


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
const Author = mongoose.model('Author', AuthorSchema);
const Book = mongoose.model('Book', BookSchema);

// root route for application/server
app.get('/', function (request, response) {
  response.render('index');
});


// author routes
// root route for resource authors
app.get('/authors', function (request, response) {
  Author.find({})
    .populate('books')
    // success
    .then(authors => response.render('authors/index', { authors: authors }))
    // failure
    .catch(console.log);
});

app.get('/authors/new', function (request, response) {
  response.render('authors/new');
});

app.post('/authors', function (request, response) {
  console.log(request.body);
  // const author = new Author(request.body);
  Author.create(request.body)
    .then(author => {
      console.log(author);
      response.redirect('/authors');
    })
    .catch(console.log);

});


// book routes

app.get('/books', function (request, response) {

  Book.find({})
    .populate('author')
    .then(books => {
      // Author.find({})
      //   .then(authors => {
      //     for (const book of books) {
      //       for (const author of authors) {
      //         if (book.author === author._id) {
      //           book.author = author;
      //           break;
      //         }
      //       }
      //     }
        // })
      
      response.render('books/index', { books });
    })
    .catch(console.log);
  
});


app.get('/books/new', function (request, response) {
  Author.find({})
    .then(authors => response.render('books/new', { authors }))
    .catch(error => {
      console.log(error); 

      response.redirect('/books');
    })
  
});

app.post('/books', function (request, response) {
  console.log(request.body);

  Book.create(request.body)
    .then(book => {
      console.log(book);

      return Author.findById(book.author)
        .then(author => {
          
          author.books.push(book._id);
          console.log(author);

          return author.save();
        })
        .then(() => response.redirect('/books'));

    })
    .catch(error => {
      const errors = Object.keys(error.errors).map(key => error.errors[key].message);

      response.render('books/new', { errors });
    })
});

// listening for incoming connection on port
app.listen(port, () => console.log(`express server listening on port ${port}`));
