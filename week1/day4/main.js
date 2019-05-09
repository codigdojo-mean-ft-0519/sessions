
// console.log('before');


// function sayHello(name) {
//   setTimeout(function () {
//     console.log(`Hello ${name}`);
//   }, 2000);
// }

// sayHello('Jason');

// console.log('after');


function getThingsFromDb(query, callback) {
  console.log(`we requested ${query}`);
  return setTimeout(function () {
    const data = ['thing1', 'thing2', 'thing3'];
    console.log('running timeout', data);
    callback(data);
    return data;
   }, 2000);

}


getThingsFromDb('select * from things;', function (things) { 
  console.log('things callback', things);
});


