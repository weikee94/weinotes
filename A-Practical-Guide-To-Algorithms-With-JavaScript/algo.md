Complexity of common operations

| Complexity |                   Operation                    |
| ---------- | :--------------------------------------------: |
| O(1)       |              running a statement               |
| O(1)       |    value look up on array, object, variable    |
| O(logn)    | loop that cuts problem in half every iteration |
| O(n)       |      loop through the values of an array       |
| O(n^2)     |               double nested loop               |
| O(n^3)     |               triple nested loop               |

What is the Time Complexity?

Question 1

```js
var countChars = function(str) {
  var count = 0; // operation 1

  for (var i = 0; i < str.length; i++) {
    count++; // operation n
  }

  return count; // operation 1
};

countChars("dance"); // O(n+2) => O(n)
```

Question 2

```js
var countChars = function(str) {
  return str.length; // operation 1 (cuz js keep track the length by property lookup)
};

countChars("dance"); // O(1)
```

Question 3

```js
var myList = ["hello", "hola"];

myList.push("bonjour"); // O(1)

myList.unshift(); // O(1)

myList.shift(); // O(n)
```

Question 4

```js
const isUnique = arr => {
  let result = true;

  for (let i = 0; i < arr.length; i++) {
    console.log(`---OUTER LOOP--- ${i}`);
    for (let j = 0; j < arr.length; j++) {
      console.log(`---INNER LOOP--- ${j}`);
      if (i !== j && arr[i] === arr[j]) {
        result = false;
      }
    }
  }

  return result;
};

console.log(isUnique([1, 2, 3]) === true); // O(n^2)
```

Question 5

```js
const isUnique = arr => {
  const breadcrumbs = {};
  let result = true;

  for (let i = 0; i < arr.length; i++) {
    console.log(`---Loop--- ${i}`);
    if (breadcrumbs[arr[i]]) {
      result = false;
    } else {
      breadcrumbs[arr[i]] = true; // object look up is constant
    }
  }
  return result;
};

console.log(isUnique([1, 2, 3]) === true); // O(n, object lookup is 1)
```
