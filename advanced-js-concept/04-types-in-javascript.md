### Javascript Types

- number, boolean, string, undefined, null, Symbol (es6), object

```js
// Primitive (other than object type is called primitive)
typeof 5; // number
typeof true; // boolean
typeof "Testing"; // string
typeof undefined; // undefined
typeof null; // object
typeof Symbol("abc"); // symbol

// Non primitive
typeof {}; // object
typeof []; // object
typeof function() {}; // function
```

### Array is Array

- since typeof array return object, in newest js we use isArray to check

```js
var array = [1, 2, 3];
Array.isArray(array); // returnn true
```

### Pass By Reference vs Pass By Value

- primitive type pass by value

```js
var a = 10;
var b = 20;

b++;

console.log("a", a); // 10
console.log("b", b); // 21
```

- non-primitive type pass by reference

```js
// Object
let obj1 = { name: "lala", size: 2 };
let obj2 = obj1;

obj2.name = "zzz";

console.log("obj1", obj1); // { name: 'zzz', size: 2 }
console.log("obj2", obj2); // { name: 'zzz', size: 2 }

// If you want to SHALLOW clone object (object assign or spread operator)
let obj3 = { a: "zzz", b: "yyy" };
let obj4 = Object.assign({}, obj3);
let obj5 = { ...obj3 };

obj3.b = "xxx";

console.log("obj3", obj3); // { a: "zzz", b: "xxx" };
console.log("obj4 clone", obj4); // { a: "zzz", b: "yyy" };
console.log("obj5 clone", obj5); // { a: "zzz", b: "yyy" };

// SHALLOW copy first layer only below example will demonstrate
let obj6 = {
  first: "first layer",
  second: {
    deep: "second layer"
  }
};
let obj7 = { ...obj6 };

obj6.second.deep = "second update";

// both second.deep become 'second update'
console.log("obj6", obj6);
console.log("obj7", obj7);

// In order to copy entire object can use JSON.parse(JSON.stringigy())
let obj8 = {
  first: "first layer",
  second: {
    deep: "second layer"
  }
};
let obj9 = JSON.parse(JSON.stringify(obj8));
obj8.second.deep = "second update again";
console.log("obj8", obj8);
console.log("obj9 deep clone object", obj9);

// Array
var arr1 = [1, 2, 3, 4, 5];
var arr2 = arr1;

arr2.push(1002);

console.log("arr1", arr1); // [1,2,3,4,5,1002]
console.log("arr2", arr2); // [1,2,3,4,5,1002]

// If you want to clone array
var arr3 = [100, 101, 102];
var arr4 = [].concat(arr3);

arr4.push(103);
console.log("arr3", arr3); // [100,101,102]
console.log("arr4", arr4); // [100,101,102,103]
```

### Compare Two Object

```js
// object order is important
var user1 = { name: "nerd", org: "dev" };
var user2 = { name: "nerd", org: "dev" };
var eq = JSON.stringify(user1) === JSON.stringify(user2);
console.log(eq); // true

var user3 = { name: "nerd", org: "dev" };
var user4 = { org: "dev", name: "nerd" };
var eq2 = JSON.stringify(user3) === JSON.stringify(user4);
console.log(eq2); // false
```
