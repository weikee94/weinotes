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

Bubble Sort

- loop through an array, comparing adjacent indicies and swapping the greater value to the end

Merge Sort

- Recursively merge sorted sub-lists
