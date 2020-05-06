// --- Directions
// Write a function that accepts a positive number N.
// The function should console log a step shape
// with N levels using the # character.  Make sure the
// step has spaces on the right hand side!
// --- Examples
//   steps(2)
//       '# '
//       '##'
//   steps(3)
//       '#  '
//       '## '
//       '###'
//   steps(4)
//       '#   '
//       '##  '
//       '### '
//       '####'

function steps(n) {
  // 想像成matrix
  // r0 c0 = '#'
  // r0 c1 = " "
  // 當c1 number > r1 number 就是空格； 要不然就是 #

  // 長這種樣子
  // r0c0 r0c1 r0c2
  // r1c0 r1c1 r1c2
  // r2c0 r2c1 r2c2

  // 循環row
  for (let i = 0; i < n; i++) {
    let stair = "";

    // 循環column
    for (let j = 0; j < n; j++) {
      if (j > i) {
        stair += " ";
      } else {
        stair += "#";
      }
    }

    console.log(stair);
  }
}

module.exports = steps;
