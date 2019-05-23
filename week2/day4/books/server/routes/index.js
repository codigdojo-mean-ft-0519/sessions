const router = require('express').Router();
const BookRouter = require('./book.route');

module.exports = router.use('/books', BookRouter);
// .use('/authors', AuthorRouter)
