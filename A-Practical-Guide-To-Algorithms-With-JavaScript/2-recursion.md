Call Stack Game

Example 1

```js
var tracker = 0;

var callMe = function() {
  tracker++;
  if (tracker === 3) {
    return "loops";
  }
  return callMe("anytime");
};

callMe(); // => loops
```

Example 2

```js
var tracker = 0;

var callMe = function(arg) {
  tracker++;
  if (tracker === 3) {
    return `loops! ${arg}`;
  }
  return callMe("anytime");
};

callMe(); // => loops! anytime
```

Recursion in 4 steps

- Identify base case(s)
- Identify recursive case(s)
- Return where appropriate
- Write procedures for each case that bring you closer to the base case(s)

Example

```js
var callMyself = function () {
    if() {
        // base case
        return;
    } else {
        callMyself;
    }
    return;
}
```

Looping N Times

```js
const loopNTimes = n => {
  console.log("n ===", n);

  if (n <= 1) {
    return "complete";
  }

  return loopNTimes(n - 1);
};

loopNTimes(3);
```

Factorial Loops

```js
function factorialLoop(num) {
  let result = 1;

  for (let i = 2; i <= num; i++) {
    result = result * i;
  }

  return result;
}
```

Recursive Factorial Loops

```js
function recursiveFactorialLoop(num) {
  if (num === 1) {
    return 1;
  } else {
    return num * recursiveFactorialLoop(num - 1);
  }
}
```

Log Number Recursively

```js
function logNumRecursive(start, end) {
  console.log(`Looping ....`);
  console.log("Start: ", start);
  console.log("End: ", end);

  function recurse(i) {
    if (i < end) {
      console.log("Hittig index: ", i);
      return recurse(i + 1);
    }
  }

  recurse(start);
}
logNumRecursive(1, 9);
```

Tail-Call Optimization

- ES6 offers TCO, which allows some functions to be called without growing the call stack.

Common patterns for recursion

- Wrapper functions
- Accumulators

Wrapper functions

```js
function wrapperFnLoop(start, end) {
  function recurse(i) {
    console.log(`looping from ${start} until ${end}`);

    if (i < end) {
      recurse(i + 1);
    }
  }
  recurse(start);
}
```

```js
function MemoFnLoop(i, end) {
  console.log(`looping from ${i} until ${end}`);
  if (i < end) {
    MemoFnLoop(i + 1, end);
  }
}
```

Accumulators

Recursive Example

```js
function joinElements(arr, joinString) {
  function recurse(index, resultSoFar) {
    resultSoFar += arr[index];
    if (index === arr.length - 1) {
      console.log(resultSoFar);
      return resultSoFar;
    } else {
      recurse(index + 1, resultSoFar + joinString);
    }
  }

  return recurse(0, "");
}

joinElements(["s", "cr", "t cod", ""], "e");
```

Iterate Example

```js
function joinIterateElements(arr, joinString) {
  let ans = "";
  for (let i = 0; i < arr.length - 1; i++) {
    ans = ans + arr[i] + joinString;
  }
  return ans;
}

joinIterateElements(["s", "cr", "t cod", ""], "e");
```

Recursive Factorial Method

```js
function recursiveFactorial(num) {
  if (num === 1) {
    return num;
  } else {
    return num * recursiveFactorial(num - 1);
  }
}

recursiveFactorial(2); // 2
recursiveFactorial(4); // 24
```

Recursive Factorial Memoize (need review)

```js
const memoize = fn => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    console.log("Args: ", ...args);
    if (n in cache) {
      console.log("Fetching from cache: ", cache[n]);
      return cache[n];
    } else {
      let result;
      result = fn(n);
      cache[n] = result;
      console.log("Calculating: ", result);
      return result;
    }
  };
};

const factorial = memoize(x => {
  if (x === 1) {
    return x;
  } else {
    return x * factorial(x - 1);
  }
});

console.log(factorial(3)); // 6
console.log(factorial(4)); // 24
```
