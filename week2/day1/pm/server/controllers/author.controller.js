const mongoose = require('mongoose');
const Author = mongoose.model('Author');

module.exports = {
  index(request, response) {
    Author.find({})
    .populate('books')
    // success
    .then(authors => response.render('authors/index', { authors: authors }))
    // failure
    .catch(console.log);
  },
  create(request, response) {
    console.log(request.body);
    // const author = new Author(request.body);
    Author.create(request.body)
      .then(author => {
        console.log(author);
        response.redirect('/authors');
      })
      .catch(console.log);
  },
  show(request, response) {},
  new(request, response) {
    response.render('authors/new');
  },
  // edit: function () { },
  // equivalent to above ^^ 
  edit(request, response) {},
  update(request, response) {},
  destroy(request, response) {},
};