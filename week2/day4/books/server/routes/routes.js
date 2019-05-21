const path = require('path');

module.exports = function(app) {
  app.get('*', function(request, response) {
    console.log('matching url ' + request.url);
    const filePath = path.join(__dirname, '../../dist/books/index.html');

    console.log(filePath);
    response.sendFile(filePath);
  });
};
