const router = require('express').Router();
const AuthRouter = require('./auth.route');
const BookRouter = require('./book.route');

module.exports = router.use('/books', BookRouter).use('/auth', AuthRouter);
