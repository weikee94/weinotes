// --- Directions
// Write a function that returns the number of vowels
// used in a string.  Vowels are the characters 'a', 'e'
// 'i', 'o', and 'u'.
// --- Examples
//   vowels('Hi There!') --> 3
//   vowels('Why do you ask?') --> 4
//   vowels('Why?') --> 0

function vowels(str) {
  let count = 0;
  let vowelsArr = ["a", "e", "i", "o", "u"];
  let strArr = str.toLowerCase().split("");
  for (const iterator of strArr) {
    if (vowelsArr.includes(iterator)) {
      count += 1;
    }
  }
  return count;
}

function vowels(str) {
  // regular expression
  // [aeiou] 這裏是要匹配的條件
  // /gi i 是for case sensitive 就是大小寫都概括； g是global檢查
  let match = str.match(/[aeiou]/gi);
  return match ? match.length : 0;
}

module.exports = vowels;
