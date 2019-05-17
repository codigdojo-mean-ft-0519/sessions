let myStr: string = 'this is a string';

myStr = '234';

const array: Array<BoolStrNum> = ['cat', 'dog', 'horse'];

array.push('this is a string');
array.push(234234);
array.push(true);
// array.push({});

// our custom type
type BoolStrNum = true | string | number;


const first = array[0];

// string type guard
function isString(value: any): value is string {
  return typeof value === 'string';
}

if (isString(first)) {
  // first is a string
  first.charCodeAt(0);
  console.log('value is a string');
} else {
  // first is not a string
}

// function User(name, age) {
//   this.name = name;
//   this.age = age;
// }


class User {
  // instance variable declaration
  // name: string;
  // age: number;

  // private information can only be used within the class instance <<--
  constructor(public name: string, public age: number) {
    // this.name is an instance variable = name is a local var
    // this.name = name;
    // this.age = age;

    // this.sayHello('Sally');
  }

  // instance method accepting string value and returning nothing (void|undefined)
  sayHello(name: string): void {
    console.log(`Hello ${name}, from ${this.name}`);
  }


  // get balance() {
  //   return this.bankBalance;
  // }

  // set balance(value: number) {
  //   // ensure valid 
  //   this.bankBalance = value;
  // }


}

const user = new User('Bob', 34);



class Person extends User {
  constructor(name: string, age: number, public email: string) {
    super(name, age);
    // this.sayHello('Bob');
  }
}

const sally = new Person('Sally', 23, 'sally@sal');
user.sayHello(sally.name);
sally.sayHello(user.name);