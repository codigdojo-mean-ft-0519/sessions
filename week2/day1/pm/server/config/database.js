const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const modelsPath = path.join(__dirname, '../models');

// mongoose connection setup
mongoose.connect('mongodb://localhost/authors_and_books', {
  useNewUrlParser: true,
  useCreateIndex: true
});
mongoose.connection.on('connected', () => console.log('Connected to Mongo'));

fs.readdirSync(modelsPath).forEach(file => {
  // console.log('current file is ' + file, file.endsWith('.js'));
  
  if (file.endsWith('.js')) {
    require(path.join(modelsPath, file));
  }
})