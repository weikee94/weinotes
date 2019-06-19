### Global Execution Context

- global object and this object during the creation phase that gets assigned
- hoisting
- execution code

### Lexical Environment (Lexical Scope)

- in javascript our lexical scope (available data + variables where the function was defined) determines our available variables. Not where the function is called(dynamic scope).

### Hoisting

- hoisting it is the js engine allocating memory for the variables and function during creation phase before execution phase.
- var keyword and function will trigger hoisting.
- variables is partially hoisting, function is fully hoisting(something gets put in memory during the creation phase)
- const and let wont hoisted

```js
console.log("1---");
console.log(animal);
console.log(sing());
var animal = "duck";

// function expression
var sing2 = function() {
  console.log("oh oh oh oh");
};

// function declaration
function sing() {
  console.log("lala lala");
}

// result will be
// 1---
// undefined
// lala lala
// undefined
```

### Exercise: Hoisting

```js
var favFood = "grapes";

var foodThoughts = function() {
  console.log("Original: " + favFood);
  var favFood = "sushi";
  console.log("New: " + favFood);
};

foodThoughts();

// result will be
// Original: undefined
// New: sushi
// The reason why Original is undefined is because as soon as we run this function a new execution context is created, and inside this execution context hoisting happens during the creation phase, so it will hoist the favFood to undefined. (hoisting only applicable when see var keywords or function)
```

### Function Invocation

```js
// Function Expression
// this function is defined on runtime when we call the function
var test = () => {
  console.log("test");
};

// Function Declaration
// this funciton is defined when compiler initially looks at the code and start hoisting and allocating memory
function test2() {
  console.log("test 2");
}

// Function Invocation/Call/Execution
test();
test2();
```

### Arguments Keyword

```js
// try to avoid using arguments (can replace using Array.from in example 1 or spread operator in example 2)
function argFunction(a1, a2) {
  console.log("arguments: ", arguments); // { 0: 'a', 1: 'b' }
  console.log(Array.from(arguments)); // ["a", "b"]
  return `${a1} and ${a2}`;
}

function argFunction2(...args) {
  console.log("arguments: ", args); // ["a", "b"]
}

argFunction("a", "b");
argFunction2("a", "b");
```

### Variable Environment

```js
function two() {
  var isValid;
}

function one() {
  var isValid = true;
  two();
}

var isValid = false;
one();

// two -- undefined
// one -- true
// global -- false
```

### Scope Chain

```js
// function lexical environment
function a() {
  var a = "a";
  return function b() {
    var b = "b";
    // console.log(c) this will throw reference error c is not defined
    return function c() {
      var c = "c";
      // console.log(a) this will return a
      return "c";
    };
  };
}

a()()(); // return c
```

### Function Scope vs Block Scope

```js
// function scope
function a() {
  var secretA = "woohoo";
}

secretA; // reference error secret is not defined

if (1 > 0) {
  var secret = "lala";
}

secret; // this will return lala

// const and let using block scope
if (2 > 0) {
  const newSecret = "lala";
  let anotherSecret = "land";
}

newSecret; // reference error newSecret is not defined
anotherSecret; // reference error anotherSecret is not defined

// block scoping example
function loop() {
  for (let i = 0; i < 2; i++) {
    console.log(i);
  }
  console.log("final", i);
}

function loop2() {
  for (var i = 0; i < 2; i++) {
    console.log(i);
  }
  console.log("final", i);
}

loop();
// --- result ---
// 0
// 1
// reference error i is not defined because let is block scoping

loop2();
// --- result ---
// 0
// 1
// final 2
```

### IIFE

- immediately invoked function expression

```js
(function() {
  var a = 1;
})();

a; // reference error, a is not defined because a is inside the function scope
```

### this

- this refers to the object that the function is a property of

```js
obj.someFunc(this);

const obj2 = {
  name: "Wei",
  sing() {
    return "woohoo " + this.name;
  },
  singAgain() {
    return this.sing() + "!";
  }
};

obj2.sing();
// woohoo Wei
// trick to remember this
// is whatever to the left of the dot which is the object that the function is a property of

const name = "Jason";

function importantPerson() {
  console.log(this.name);
}

importantPerson(); // 'Jason'

const obj3 = {
  name: "Jacob",
  importantPerson: importantPerson
};

const obj4 = {
  name: "James",
  importantPerson: importantPerson
};

obj3.importantPerson(); // 'Jacob'
obj4.importantPerson(); // 'James'
```

### Lexical Scope vs Dynamic Scope

```js
// function call is dynamic scope based on when the function been called
const a = function() {
  console.log("a", this);
  const b = function() {
    console.log("b", this);
    const c = {
      hi: function() {
        console.log("c", this);
      }
    };
    c.hi(); // {hi: f}
  };
  b(); // window object
};

a(); // window object

const obj5 = {
  name: "Adam",
  sing() {
    console.log("a", this); // {name: 'Adam', sing: f}
    var anotherFunction = function() {
      console.log("b", this); // window object
    };
    anotherFunction();
  }
};

// In order to solve this bind to different thing we have three methods

// method 1 (using es6 arrow function)
const obj5 = {
  name: "Adam",
  sing() {
    console.log("a", this); // {name: 'Adam', sing: f}
    var anotherFunction = () => {
      console.log("b", this); // {name: 'Adam', sing: f}
    };
    anotherFunction();
  }
};

// method 2 using bind
const obj5 = {
  name: "Adam",
  sing() {
    console.log("a", this); // {name: 'Adam', sing: f}
    var anotherFunction = () => {
      console.log("b", this); // {name: 'Adam', sing: f}
    };
    return anotherFunction.bind(this);
  }
};

// method 3 using reference like jQuery
const obj5 = {
  name: "Adam",
  sing() {
    console.log("a", this); // {name: 'Adam', sing: f}
    var self = this;
    var anotherFunction = () => {
      console.log("b", self); // {name: 'Adam', sing: f}
    };
    return anotherFunction;
  }
};
```

### call, apply, bind

- call and apply used when borrow method from other object
- difference between call and apply, apply use array in second params
- bind return function instead invoke
- bind is useful for call the functions later on with a certain context

```js
const wizard = {
  name: "Wii",
  health: 50,
  heal(num1, num2) {
    return (this.health += num1 + num2);
  }
};

const archer = {
  name: "Arc",
  health: 30
};

console.log("initial: ", archer);
wizard.heal.call(archer, 30, 40);
console.log("call: ", archer);
wizard.heal.apply(archer, [100, 200]);
console.log("apply: ", archer);
var laterCallWizard = wizard.heal.bind(archer, 10, 10);
laterCallWizard();
console.log("bind: ", archer);

const array = [1, 2, 3];

function getMaxNumber(arr) {
  console.log(Math.max.apply(null, array));
}

getMaxNumber(array);
```

### bind(), currying

- function currying

```js
function multiply(a, b) {
  return a * b;
}

let multipleTwo = multiply.bind(this, 2);
console.log(multipleTwo(20)); // 40
let multipleFour = multiply.bind(this, 4);
console.log(multipleFour(20)); // 80
```

### Exercise this keyword

```js
//example 1
var b = {
  name: "jay",
  say() {
    console.log(this);
  }
};

var c = {
  name: "chou",
  say() {
    return function() {
      console.log(this);
    };
  }
};

var d = {
  name: "lun",
  say() {
    return () => console.log(this);
  }
};

b.say(); // { name: 'jay', function }
c.say()(); // window object (determine where it called)
d.say()(); // arrow function is lexical scope ({ name: 'lun, function })

//example 2
const character = {
  name: "Abc",
  getCharacter() {
    console.log(this); // { name: 'Abc', getCharacter: f }
    return this.name;
  }
};

const getValueFromAssignedVariable = character.getCharacter.bind(character);
getValueFromAssignedVariable(); // { name: 'Abc', getCharacter: f }
```
