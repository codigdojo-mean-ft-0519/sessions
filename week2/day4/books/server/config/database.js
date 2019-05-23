const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const modelsPath = path.join(__dirname, '../models');

mongoose.connect('mongodb://localhost/books', { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log('connected to mongodb'));

// this ensures the models/schemas are loaded
fs.readdirSync(modelsPath)
  // does this file end with .js
  .filter(file => file.endsWith('.js'))
  .forEach(file => require(path.join(modelsPath, file)));
