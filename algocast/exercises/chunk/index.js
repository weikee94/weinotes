// --- Directions
// Given an array and chunk size, divide the array into many subarrays
// where each subarray is of length size
// --- Examples
// chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]

function chunk(array, size) {
  let arr = [];
  if (size > array.length) {
    arr.push(array);
  } else {
    for (const iterator of array) {
      let last = arr[arr.length - 1];

      if (!last || last.length === size) {
        arr.push([iterator]);
      } else {
        last.push(iterator);
      }
      // [1,2,3] , 2
      // 分析
      // 第一次檢查為 !undefined (last = arr[0-1] === arr[-1] === undefined)
      // arr.push([1]) 此時 arr = [[1]]
      // 第二次因為 last = arr[0], last其實是[1]
      // last.push(2); [1,2]
      // 第三次因為 last.length === size
      // arr.push([3]) 此時arr 變成了 [[1,2],[3]]
    }
  }
  return arr;
}

function chunk(array, size) {
  let arr = [];
  let index = 0;
  while (index < array.length) {
    // slice(0,2) 只會包括0，1 不包括2
    arr.push(array.slice(index, index + size));
    index += size;
  }

  return arr;
}

module.exports = chunk;
