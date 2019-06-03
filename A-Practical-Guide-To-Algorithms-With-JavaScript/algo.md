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

Question 6

1. Transform to unique sort.
2. input: [4, 2, 3, 2, 3] => [2, 3, 4]

```js
const uniqSort = function(arr) {
  const breadcrumbs = {};
  let ans = [];
  for (let i = 0; i < arr.length; i++) {
    if (!breadcrumbs[arr[i]]) {
      // * !undefined (这是true)
      // 第一次遇见2 （i = 1）
      //  breadcrumbs[2] 这个时候还没有2，return undefined
      //    !undefined = true
      //      这个时候set breadcrumbs[2] = true => {2: true}
      // 第二次遇见2  (i = 2)
      //  breadcrumbs[2] return true
      //    !true = false
      //      false 什么也没做
      ans.push(arr[i]);
      breadcrumbs[arr[i]] = true;
    }
  }
  return ans.sort((a, b) => a - b);
};

uniqSort([4, 2, 2, 3, 2, 2]); // => [2, 3, 4]
```

Question 7

1. Write a function takes an argument, n, and multiples in times 10

```js
const times10 = n => {
  return n * 10;
};

console.log("times10 returns: ", times10(9));
```

Question 8

1. Use an object to cache the results of your times10 function.
2. Create a function that checks if the value for n has been calculated before.
3. If the value for n has not been calculcated, calculate and then save the result in cache object.

```js
const cache = {};

const memoTimes10 = n => {
  if (n in cache) {
    console.log("Fetching from cache:", n);
    return cache[n];
  } else {
    console.log("Calculating result");
    let result = times10(n);
    cache[n] = result;
    return result;
  }
};

console.log("Calculated value: ", memoTimes10(9));
console.log("Cached value: ", memoTimes10(9));
```

Question 9 (need review)

1. Clean up global scope by moving cache inside your function.
2. Use a closure to return a function that you can call later.

```js
const memoizedClosureTimes10 = () => {
  let cache = {};

  return n => {
    if (n in cache) {
      console.log("Fetching from cache:", n);
      return cache[n];
    } else {
      console.log("Calculating");
      let result = n * 10;
      cache[n] = result;
      return result;
    }
  };
};

const memoClosureTimes10 = memoizedClosureTimes10();
try {
  console.log("calculated value: ", memoClosureTimes10(9));
  console.log("cached value: ", memoClosureTimes10(9));
} catch (e) {
  console.error(e);
}
```

Question 10 (need review)

1. Make memo function generic and accept times10 function as a callback rather than defining the n \* 10 logic inside the if/else
2. Take advantage of the fact that parameters are saved in the closure.

```js
const times10 = n => n * 10;

const memoize = cb => {
  let cache = {};
  return n => {
    if (n in cache) {
      console.log("Fetching from cache:", n);
      return cache[n];
    } else {
      console.log("Calculating result");
      let result = cb(n);
      cache[n] = result;
      return result;
    }
  };
};

const memoizedTimes10 = memoize(times10);

try {
  console.log("Calculated value: ", memoizedTimes10(9));
  console.log("Cached value: ", memoizedTimes10(9));
} catch (e) {
  console.error(e);
}
```
