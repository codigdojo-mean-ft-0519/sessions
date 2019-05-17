var myStr = 'this is a string';
myStr = '234';
var array = ['cat', 'dog', 'horse'];
array.push('this is a string');
array.push(234234);
array.push(true);
var first = array[0];
function isString(value) {
    return typeof value === 'string';
}
if (isString(first)) {
    // first is a string
    first.charCodeAt(0);
    console.log('value is a string');
}
else {
    // first is not a string
}
// function User(name, age) {
//   this.name = name;
//   this.age = age;
// }
var User = /** @class */ (function () {
    // instance variable declaration
    // name: string;
    // age: number;
    function User(name, age) {
        this.name = name;
        this.age = age;
        // this.name is an instance variable = name is a local var
        // this.name = name;
        // this.age = age;
    }
    // instance method accepting string value and returning nothing (void|undefined)
    User.prototype.sayHello = function (name) {
        console.log("Hello " + name + ", from " + this.name);
    };
    return User;
}());
var user = new User('Bob', 34);
user.sayHello('Sally');
