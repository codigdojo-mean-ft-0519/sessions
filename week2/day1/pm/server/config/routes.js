
// const Author = require('../models/author.model');
// still need models 

const BookController = require('../controllers/book.controller');
const AuthorController = require('../controllers/author.controller');

module.exports = function (app) {
  console.log('loading routes');
  // root route for application/server
  app.get('/', function (request, response) {
    response.render('index');
  });


  // author routes
  // root route for resource authors
  app.get('/authors', AuthorController.index);

  app.get('/authors/new', function (request, response) {
    AuthorController.new(request, response);
  });

  // app.get('/authors/new', AuthorController.new);

  app.post('/authors', AuthorController.create);


  // book routes

  // /books/laksjhfklsajsdhflkasjdfh

  app.get('/books', BookController.index);
  app.get('/books/:book_id', BookController.show);

  // {
  //   book_id: 'laksjhfklsajsdhflkasjdfh'
  // }

  app.get('/books/new', BookController.new);
  app.post('/books', BookController.create);
}