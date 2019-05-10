const color = require('colors');
/**
* Create middleware that reports information about the incoming http request
* Certain elements will be objects(body, etc), display the key value pairs
* Items to report iff they have value, use colors (an external module):
*                 method
*                 hostname
*                 ip
*                 body
*                 params
*                 protocol
*                 route
*                 path
*                 query
*/

module.exports = function (request, response, next) {
  console.log('running logger middleware', request.body)
  const keys = ['method', 'hostname', 'ip', 'body', 'params', 'path', 'protocol', 'route', 'query'];

  keys.forEach(key => {
    const data = request[key];
    
    if (data) {
      if (typeof data === 'object') {
        if (Object.keys(data).length) {
          console.log(color.yellow(`The request ${key} object has these properties:`));

          for (const [property, value] of Object.entries(data)) {
            console.log(color.green(`\t${property} => ${value}`));
          }
          
        }
      } else {
        console.log(color.gray(`The request ${key} is ${data}`));
      }
    }
  });

  next();
};