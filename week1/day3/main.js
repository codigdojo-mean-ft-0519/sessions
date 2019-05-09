



// function sub2(array) {
//   const results = []; 

//   for (let index = 0; index < array.length; index++) {
//     const element = array[index];

//     const value = element - 2;

//     results.push(value);
//   }

//   return results;
// }

// console.log(sub2(numbers));
function add2(array) {
  const results = [];

  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    const value = element + 2;

    results.push(value);
  }

  return results;
}


const numbers = [34, 12, 435, 78, 290];

console.log(add2(numbers));

function map(array, callback) {
  const results = []; 
  // console.log(callback);
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    // console.log('element inside loop', element);
    const value = callback(element, index, array);
    // console.log('got value from anon func', value);
    results.push(value);
  }

  return results;
}

console.log('add2', map(numbers, anElementFromMap => anElementFromMap + 2));

console.log(map(numbers, elementFromMap => elementFromMap - 2));
console.log(map(numbers, function (elementFromMap) {
  return elementFromMap - 2
}));

console.log('just add', map(numbers, add))

function add(num1, num2) {
  console.log('add two numbers', num1, num2);
  return num1 + num2;
}


// function func(val) {
//   console.log(typeof val);
  
//   if (typeof val === 'function') {
//     val();
//   }
// }



// func(function () { 
//   console.log('inside anon func');
// });
