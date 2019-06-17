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
