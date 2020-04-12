### Function Are Objects

- there are total five ways to invoke function
- function is special type of object which is called callable object

```js
function one() {
  return 1;
}
one();

const two = function() {
  return 2;
};
two();

let obj = {
  three() {
    return 3;
  }
};

obj.three();

function four() {
  return 4;
}
four.call();

// Function can accept parameters
const five = new Function("return 5");
five();

const six = new Function("num", "return num");
six(6);

// Callable Object (Function)
function lala() {
  console.log("lala");
}

lala.yell = "ohohoh"; // yell become properties to lala function

// underneath the hood it do something like this
/* const specialObj = {
        yell: 'ohohoh',
        name: 'lala',
        (): console.log('lala')
    }
*/
```

### First Class Citizens

- function able to pass data around

```js
// 1 (we assign function to a variable)
var a = function() {};

//2 (pass function to another function)
function b(fn) {
  fn();
}

b(function() {
  console.log("pass function called");
}); // pass function called

//3 (return function from another function)
function c() {
  return function d() {
    console.log("return function invoked");
  };
}
c(); // return f(){}
c()(); // return function invoked
```

### High Order Function

- function return another function
- function accept function as parameters

```js
// without high order function you probably need write letPerson every single time when name and level different
// with high order function
const giveAccess = name => "Access granted " + name;
function auth(num) {
  let array = [];
  for (let i = 0; i < num; i++) {
    array.push(i);
  }
}
// letPerson is high order function
function letPerson(person, fn) {
  if (person.level === "admin") {
    fn(100);
  } else if (person.level === "user") {
    fn(10);
  }
  return giveAccessTo(person.name);
}

letPerson({ level: "admin", name: "James" }, auth);

// multiply higher order functions
const multiply = num1 => {
  return num2 => {
    return num2 * num1;
  };
};

const multiplyBy4 = multiply(4);
multiplyBy4(10); // 40
multiplyBy4(3); // 12

const multiplyBy5 = multiply(5);
multiplyBy5(10); // 50
multiplyBy5(3); // 15
```

### Closures

```js
```
