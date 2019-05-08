// var index;
var myvar = 'some content';

myvar = 234234;

console.log(myvar);
//  offset    0       1
var array = [2123, 'cat', 'dog'];

console.log(array.push('horse'));

console.log(array[1]);

// array = []

// console.log('before index', index);

for (let index = 0; index < array.length; index++) {
  console.log('index is ' + index + ' value is ' + array[index]);
}

// console.log('after index', index);

for (var element in array) {
  console.log('element is ' + array[element]);
}
console.log(array.entries())
for (var [index, element] of array.entries()) {
  // var index = element[0]; 
  // var thing = element[1];
  console.log('element is ', element, index);
}
// var num = array[0];
// var cat = array[1];
// var array = [2123, 'cat', 'dog'];
// destructuring assignment 
var [num, , cat] = array;


console.log(num, cat)



var person = ['brown', 'brown', 5];

const person = {
  "hair": 'brown',
  eyeColor: 'brown',
  age: 5,
  property: 'this iis key'
};

person.occupation = 'developer';

// person = {}

console.log(person);

for (var key in person) {
  console.log('key is ', key, person[key]);
}
console.log(array);

function scope() {
  var scopeVar = 'scoped content'

  function childScope() {
    var childVar = 'this is a child';
  }
  
  childScope();
}

scope();


function sayHello(name, ...rest) {
  console.log(array);
  console.log('Hello ' + name);
}

sayHello('jason', true, 23984798);

console.log(array);

 
function sum(...numbers) {
  var s = 0;

  for (var i = 0; i < numbers.length; i++)  {

  }
}

function isUndefined(thing) {
  return typeof thing === 'undefined';
}


typeof thing === 'undefined'

sum(1, 3, 345)


function counter(incr) {
  var count = 0;
  // count = count + 1
  // count += 1;
  
  function childScope() {
    count += incr;
    return count;
  }

  return childScope;
}

counter = counter(3);

console.log(counter());
// // 1

console.log(counter())
// 2
console.log(counter())
// 3
console.log(counter())
// 4
console.log(counter())
// 5

