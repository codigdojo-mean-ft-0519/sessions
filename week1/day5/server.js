const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');


const port = process.env.PORT || 8000;
const app = express();

const names = ['jason', 'nina', 'kent', 'OO', 'alec'];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
  console.log('hello');
  
  response.render('index');
});

app.post('/names', function (request, response) {
  console.log(request.body.name);
  console.log('posting name')

  const personName = request.body.name;

  names.push(personName);

  // response.render('names', { name: personName, names: names });

  response.redirect('/');
});

app.get('/names/:nameId', function (request, response) {
  console.log(request.params.nameId);
  response.send(names[request.params.nameId]);
});


app.listen(port, () => console.log(`express server listening on port ${port}`));
