// --- Directions
// Given a string, return true if the string is a palindrome
// or false if it is not.  Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// --- Examples:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false

// first solution
function palindrome(str) {
  return str.split("").reverse().join("") === str ? true : false;
}

// second solution
function palindrome(str) {
  let reversed = "";
  for (const iterator of str) {
    reversed = iterator + reversed;
  }
  return str === reversed ? true : false;
}

// third solution
function palindrome(str) {
  return str
    .split("")
    .every((char, index) => char === str[str.length - index - 1]);
}

module.exports = palindrome;
