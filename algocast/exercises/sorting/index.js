// --- Directions
// Implement bubbleSort, selectionSort, and mergeSort

function bubbleSort(arr) {
  // move the largest to the right most
  // compare i and i+1
  // move the larger between the two to right
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let less = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = less;
      }
    }
  }
  return arr;
}

function selectionSort(arr) {
  // prove me wrong algo
  // set first one is minIndex
  // find the smallest to swap

  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // 是比較兩個index 一不一樣
    if (minIndex !== i) {
      let lesser = arr[minIndex];
      arr[minIndex] = arr[i];
      arr[i] = lesser;
    }
  }
  return arr;
}

function mergeSort(arr) {
  if (arr.length === 1) {
    // 重點在這裏把最小單位返回
    return arr;
  }
  // 這個是用來seperate to arr 最小單位1
  let mid = Math.floor(arr.length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid);

  mergeSort(left);
  mergeSort(right);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
  let arr = [];
  //  重點用while loop 來循環左右array
  while (left.length && right.length) {
    if (left[0] > right[0]) {
      // push的同時用shift把原來array減少
      arr.push(right.shift());
    } else {
      arr.push(left.shift());
    }
  }
  // 最後用spread operator merge together, ...left or ...right first doesnt matter
  // because either left or right array got one is already empty 重點思考
  return [...arr, ...left, ...right];
}

module.exports = { bubbleSort, selectionSort, mergeSort, merge };
