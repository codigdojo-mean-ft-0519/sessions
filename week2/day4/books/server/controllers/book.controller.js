const Book = require('mongoose').model('Book');
const { Http } = require('@status/codes');

module.exports = {
  index(request, response) {
    Book.find({})
      .then(books => response.json(books))
      .catch(error => response.status(Http.InternalServerError).json(error));
  },
  show(request, response) {
    const { book_id: bookId } = request.params;
    Book.findById(bookId)
      .then(book => response.json(book))
      .catch(error => response.status(Http.Locked).json(error));
  },
  create(request, response) {
    Book.create(request.body)
      .then(book => response.json(book))
      .catch(error => {
        // validation failure errors (as strings)
        const errors = Object.keys(error.errors).map(
          key => error.errors[key].message
        );

        response.status(Http.UnprocessableEntity).json(errors);
      });
  },
  update(request, response) {
    const { book_id: bookId } = request.params;

    Book.findByIdAndUpdate(bookId, request.body, { new: true })
      .then(book => response.json(book))
      .catch(error => {
        // validation failure errors (as strings)
        const errors = Object.keys(error.errors).map(
          key => error.errors[key].message
        );

        response.status(Http.UnprocessableEntity).json(errors);
      });
  },
  destroy(request, response) {
    const { book_id: bookId } = request.params;

    Book.findOneAndRemove(bookId)
      .then(book => response.json(book))
      .catch(error => response.status(Http.SeeOther).json(error));
  },
};
