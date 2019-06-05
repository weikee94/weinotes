Binary Search

- search for a value in a sorted array by cutting the size of the search array in a half
- when the questions is sorted array (think about using binary search approach)

Implement Linear Search

```js
function linearSearch(list, item) {
  let index = -1;
  list.forEach((listItem, i) => {
    if (listItem === item) {
      index = i;
    }
  });
  return index;
}

linearSearch([1, 45, 90, 103], 90);
```

Implement Binary Search

```js
function binarySearch(list, item) {
  var min = 0;
  var max = list.length - 1; // 4
  var guess;
  while (min <= max) {
    guess = Math.floor(min + max) / 2;
    if (list[guess] === item) {
      return guess;
    } else {
      if (list[guess] > item) {
        max = max - 1;
      } else {
        min = min + 1;
      }
    }
  }
}

binarySearch([1, 23, 33, 90, 108], 90);
```

Divide Conquer

- Recursive calls to a subset of the problem
- Recognize the base case
- Divide: Break problem down during each call
- Conquer: Do work on each subset
- Combine: Solutions

Sort Types

| Naive Sort (n^2) | Divide Conquer Sort (nlogn) |
| ---------------- | :-------------------------: |
| Bubble Sort      |         Merge Sort          |
| Insertion Sort   |         Quick Sort          |
| Selection Sort   |                             |

Bubble Sort (need review)

- loop through an array, comparing adjacent indicies and swapping the greater value to the end

```js
var arrayRandom = [9, 2, 5, 6, 4, 3, 7, 10, 1, 8];
var arrayOrdered = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var arrayReversed = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

// basic implementation
function bubbleSortBasic(array) {
  var countOuter = 0;
  var countInner = 0;
  var countSwap = 0;

  for (var i = 0; i < array.length; i++) {
    countOuter++;
    for (var j = 1; j < array.length; j++) {
      countInner++;
      if (array[j - 1] > array[j]) {
        countSwap++;
        swap(array, j - 1, j);
      }
    }
  }
  console.log("Outer: ", countOuter);
  console.log("Inner: ", countInner);
  console.log("Swap: ", countSwap);
  return array;
}
bubbleSortBasic(arrayRandom.slice());
bubbleSortBasic(arrayOrdered.slice());

// optimized implementation
function bubbleSort(array) {
  var countOuter = 0;
  var countInner = 0;
  var countSwap = 0;

  var swapped;
  do {
    countOuter++;
    swapped = false;
    for (var i = 0; i < array.length; i++) {
      countInner++;
      if (array[i] && array[i + 1] && array[i] > array[i + 1]) {
        countSwap++;
        swap(array, i, i + 1);
        swapped = true;
      }
    }
  } while (swapped);

  console.log("Outer: ", countOuter);
  console.log("Inner: ", countInner);
  console.log("Swap: ", countSwap);
  return array;
}
bubbleSort(arrayRandom.slice());
bubbleSort(arrayOrdered.slice());
```

Merge Sort (need review)

- Recursively merge sorted sub-lists
- Split the array into halves and merge them recursively
- Return once we hit an array with a single item. That is sorted array of size 1
- Compare the arrays item by item and return the concatenated result

```js
// split the array into halves and merge them recursively
function mergeSort(arr) {
  // case one (only one item in array)
  if (arr.length === 1) {
    return arr;
  }

  // get the middle item of the array rounded down
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);
  const leftSorted = mergeSort(left);
  const rightSorted = mergeSort(right);
  return merge(leftSorted, rightSorted);
}

function merge(left, right) {
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;

  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft]);
      indexLeft++;
    } else {
      result.push(right[indexRight]);
      indexRight++;
    }
  }

  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}

mergeSort([7, 6, 1, 12]);
```
