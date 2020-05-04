// --- Directions
// Given a string, return a new string with the reversed
// order of characters
// --- Examples
//   reverse('apple') === 'leppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'

// solution one
function reverse(str) {
  return str.split("").reverse().join("");
}

// solution two
function reverse(str) {
  var reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed = reversed + str[i];
  }
  return reversed;
}

// solution three
function reverse(str) {
  var reversed = "";
  for (const iterator of str) {
    debugger;
    reversed = iterator + reversed;
  }
  return reversed;
}

// solution four
function reverse(str) {
  // reduce is an array helper
  // reduce take two params; first is arrow function, second is initial value
  // everytime rev will pass to second params and continue execute
  return str.split("").reduce((rev, char) => char + rev, "");
}

module.exports = reverse;
