function orderSupplies(item) {
  let warehouse; //undefined
  const deliveryTime = Math.random() * 3000;

  return new Promise(function (resolve, reject) {
    setTimeout(function() {
      warehouse = {
        paint: {
          product: 'Neon Green Paint',
          directions: function() { return 'mix it!' }
        },
        brush: {
          product: 'Horsehair brush',
          directions: function() { return 'start painting!' }
        },
        tarp: {
          product: 'A large tarp',
          directions: function() { return 'cover the floor!' }
        }
      };
      if (item in warehouse) {
        resolve(warehouse[item]);
      } else {
        reject(new Error(`${item} is out of stock`));
      }
    }, deliveryTime);
  })
}

function receivedItem(item) {
  console.log(`Received ${item.product}, time to ${item.directions()}`);
}

const paint = orderSupplies('paint');
const brush = orderSupplies('brush');
const tarp = orderSupplies('tarp');
const roller = orderSupplies('roller');


Promise.all([tarp, paint, brush, roller])
  .then(items => {
    console.log(items);
    items.forEach(receivedItem);
  })

// tarp 
//   .then(receivedItem)
//   .then(() => paint)
//   .then(receivedItem)
//   .then(() => brush)
//   .then(receivedItem)
  .catch(function (error) {
    console.log(error.message)
  });


// orderSupplies('paint', function (item) {
//   receivedItem(item);
//   orderSupplies('brush', receivedItem);
// });

// const paint = new Promise(function (resolve, reject) {
//   // console.log(resolve, reject);

//   orderSupplies('paint', resolve);
// });
// const brush = new Promise(function (resolve, reject) {
//   // console.log(resolve, reject);

//   orderSupplies('brush', resolve);
// });

// const tarp = new Promise(function (resolve, reject) {
//   // console.log(resolve, reject);

//   orderSupplies('tarp', resolve);
// });

// tarp 
//   .then(receivedItem)
//   .then(() => paint)
//   .then(receivedItem)
//   .then(() => brush)
//   .then(receivedItem)
//   .catch(function () {
//     console.log('error');
//   });


