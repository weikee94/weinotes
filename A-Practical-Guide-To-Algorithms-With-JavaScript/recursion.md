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
