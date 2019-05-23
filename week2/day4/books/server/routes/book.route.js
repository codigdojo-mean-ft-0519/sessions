const BookController = require('../controllers/book.controller');
// const BookController = require('../controllers').BookController;
// const { BookController } = require('../controllers');
const router = require('express').Router();

// /api/books

module.exports = router
  .get('/', BookController.index)
  .post('/', BookController.create)
  .get('/:book_id', BookController.show)
  .put('/:book_id', BookController.update)
  .delete('/:book_id', BookController.destroy);
