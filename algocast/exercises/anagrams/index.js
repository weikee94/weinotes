// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case
// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False

function anagrams(stringA, stringB) {
  let mapA = buildCharMap(stringA);
  let mapB = buildCharMap(stringB);

  // let objA = {a: 1, b: 2, c: 3}
  // Object.keys(objA) => return [a,b,c]

  if (Object.keys(mapA).length !== Object.keys(mapB).length) {
    return false;
  }

  for (const key in mapA) {
    if (mapA[key] !== mapB[key]) {
      return false;
    }
  }

  return true;
}

function buildCharMap(str) {
  let charMap = {};

  for (const iterator of str.replace(/[^\w]/g, "").toLowerCase()) {
    charMap[iterator] = charMap[iterator] + 1 || 1;
  }

  return charMap;
}

function anagrams(stringA, stringB) {
  // 技巧是把string 變成 array，然後用sort 看sequence 一不一樣
  let cleanStrA = stringA
    .replace(/[^\w]/g, "")
    .toLowerCase()
    .split("")
    .sort()
    .join("");
  let cleanStrB = stringB
    .replace(/[^\w]/g, "")
    .toLowerCase()
    .split("")
    .sort()
    .join("");

  if (cleanStrA !== cleanStrB) {
    return false;
  }
  return true;
}

module.exports = anagrams;
