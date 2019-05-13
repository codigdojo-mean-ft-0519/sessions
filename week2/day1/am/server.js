const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;
// connect to db animals
mongoose.connect('mongodb://localhost/animals', { useNewUrlParser: true });
// listen for connection and log
mongoose.connection.on('connected', () => console.log('connected to mongodb'));

// / create animal blueprint
const AnimalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [4, 'More name length']
  },
  legs: {
    type: Number,
    required: [true, 'Legs are needed'],
    min: [0, 'I got no legs!!']
  },
  age: Number,
  isPet: {
    type: Boolean,
    default: true
  },
});
//  mongoose registers Animal in db as collection animals
// auto lowercase and plural
const Animal = mongoose.model('Animal', AnimalSchema);
// animal model
// console.log(Animal);
const animal = new Animal({
  name: 'Sparky',
  age: 3,
  legs: 4,
})

// animal instance (document)
console.log(animal);


animal.save()
   // success
  .then(function (savedAnimal) { 
    console.log(savedAnimal)
  })
  // failure
  .catch(function (error) {
    // console.log(error.errors.age.message);

    // const keys = Object.keys(error.errors);

    // console.log(keys);

    // for (let index = 0; index < keys.length; index++) {
    //   console.log('key is ', keys[index]);
    //   errorMessages.push(error.errors[keys[index]].message);
    // }

    
    const errorMessages = Object.keys(error.errors).map(key => error.errors[key].message);
    console.log(errorMessages);
  })
  


// // m represents mongoose object
// const m = {
//   // schema is a property of mongoose with an object value
//   Schema: { key: 'this is schema' },
//   Types: { type: 'this has types' }
// };

// // const Schema = m.Schema
// // const Types = m.Types
// // destructures Schema and Types from mongoose
// const { Schema: schema, Types } = m;
// // const schema = { key: 'this is schema' }
// // const { Types } = m;

// console.log(Schema, Types, schema)