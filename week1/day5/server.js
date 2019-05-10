const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const logger = require('./server/middleware/logger');

// console.log(logger);

const port = process.env.PORT || 8000;
const app = express();

const names = ['jason', 'nina', 'kent', 'OO', 'alec'];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger);
// app.use(function (request, response, next) {
//   console.log(next);
  
//   next(new Error('no database connection'));
// });


app.get('/', [function (r, p, n) {
  console.log('stand alone middleware')
  n();
}],  function (request, response) {
  console.log('hello');
  
  response.render('index');
});

app.post('/names', function (request, response) {
  console.log(request.body.name);
  console.log('posting name')

  const personName = request.body.name;

  names.push(personName);

  // use keys as variable in template
  response.render('names', { name: personName, names: names });

  // response.redirect('/');
});

app.get('/names/:nameId', function (request, response) {
  console.log(request.params.nameId);
  response.send(names[request.params.nameId]);
});

app.use(function (error, request, response, next) {
  ///  log error to db
  console.log(error.message);
  next(error);
})

app.use(function (error, request, response, next) {
  response.send('something went wrong');
});


app.listen(port, () => console.log(`express server listening on port ${port}`));
