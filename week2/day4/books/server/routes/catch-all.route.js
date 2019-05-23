const router = require('express').Router();
const path = require('path');

router.all('*', function(request, response) {
  console.log('matching url ' + request.url);
  const filePath = path.join(__dirname, '../../dist/books/index.html');

  console.log(filePath);
  response.sendFile(filePath);
});

module.exports = router;
