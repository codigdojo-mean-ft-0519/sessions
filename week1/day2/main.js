
function Person(name, items) {
  if (!(this instanceof Person)) {
    console.log('not a person', name)
    return new Person(name, items);
  }

  // var person = { 
  //   name: name,
  //   // items: items
  // }

  this.name = name;
  this.items = items;
  // this.take = take;

  // person.items = items;
  // person.take = take;

  // console.log('instance', this, name);


  // return this;
}

Person.prototype.take = function take(item, target, ...everything) {
  if (!target || !Array.isArray(target.items)) {
    throw new Error('target has no items array');
  }

  console.log('this is =====>', this);

  for (var index = 0; index < target.items.length; index++) {
    if (item === target.items[index]) {
      // console.log('found item ', item, index);
      // console.log(target.items);
      console.log(target.items.splice(index, 1));
      // console.log(target.items);

       this.items.push(item);

      return true;
    }
  }

  return false;
}

// class Person {
//   constructor(name, items) {
//     this.name = name;
//     this.items = items;
//   }

//   take() {
//     // ...
//   }
// }

// this === self in python 

var bob = Person('Bob', ['keys', 'cash', 'lint']);
var sally = new Person('Sally', ['gold', 'cookies', 'paper', 'hot sauce']);

console.log('take', bob.take === sally.take);

var backpack = {
  items: ['compass', 'snacks', 'matches']
};

// take('gold', sally);
console.log(sally);
console.log(bob);
console.log(backpack);
// Person.take
// backpack.take = sally.take;
console.log(backpack);

// interface Target {
//   items: string[]
// }

console.log(bob.take('gold', sally));
console.log(bob.take('snacks', backpack));
// backpack.take('gold', bob);

const bound = sally.take.bind(backpack, 'gold', bob);

// console.log(sally);

// do stuff
bound()

console.log(bob);
console.log(backpack);


// // console.log(1 === '1');

const string = `
content 




more content
`

console.log(string);