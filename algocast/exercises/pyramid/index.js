// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a pyramid shape
// with N levels using the # character.  Make sure the
// pyramid has spaces on both the left *and* right hand sides
// --- Examples
//   pyramid(1)
//       '#'
//   pyramid(2)
//       ' # '
//       '###'
//   pyramid(3)
//       '  #  '
//       ' ### '
//       '#####'

function pyramid(n) {
  for (let i = 0; i < n; i++) {
    let level = "";
    let mid = Math.floor((2 * n - 1) / 2);

    // 思路
    // 先選中間點
    // 然後根據row 左右各加row number

    // pyramid(2)
    // _ # _ (mid point = (Math.floor(2 * n -1)/2) = 1.5 ~= 1) 這裏row 是0
    // # # # 這裏row是1，所以中間左右加row number 都是#

    for (let j = 0; j < 2 * n - 1; j++) {
      // 重點判斷在下面這裏
      if (mid - i <= j && mid + i >= j) {
        level += "#";
      } else {
        level += " ";
      }
    }
    console.log(level);
  }
}

module.exports = pyramid;
