const mongoose = require('mongoose');
const Author = mongoose.model('Author');
const Book = require('../models/book.model');

module.exports = {
  // is used for getting all of a resource (books)
  index(request, response) { 
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
  },
  // used for getting a single resource (one book)
  show(request, response) {
    const bookId = request.params.book_id;

    Book.findById(bookId)
      .then(book => response.render('books/show', { book }))
      .catch(console.log);
  },

  // used for showing form to create resource (book)
  new(request, response) { 
    Author.find({})
    .then(authors => response.render('books/new', { authors }))
    .catch(error => {
      console.log(error); 

      response.redirect('/books');
    })
  
  },

  // used to show form to update a resource (book)
  edit(request, response) { },
  
  // used for creating a resource (book)
  create(request, response) { 
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
  },
  
  // used for updating a resource (book)
  update(request, response) { },
  
  // used for removing a resource (book)
  destroy(request, response) {},
};