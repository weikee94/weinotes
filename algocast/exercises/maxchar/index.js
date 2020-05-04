// --- Directions
// Given a string, return the character that is most
// commonly used in the string.
// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"

function maxChar(str) {
  let chars = {};
  let max = 0;
  let maxChar = "";

  for (let iterator of str) {
    if (!chars[iterator]) {
      chars[iterator] = 1;
    } else {
      chars[iterator]++;
    }
  }

  // using for in to iterate object
  // using for of to iterate array and strings
  for (let iterator in chars) {
    if (chars[iterator] > max) {
      max = chars[iterator];
      maxChar = iterator;
    }
  }
  return maxChar;
}

module.exports = maxChar;
