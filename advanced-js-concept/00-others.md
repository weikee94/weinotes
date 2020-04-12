```js
const arr1 = [1, 2, 3];
function getNewArr(arr) {
  const newArr = arr;
  newArr.pop();
  return newArr;
}
console.log(arr1);
getNewArr(arr1);
console.log(arr1);
VM621: 7(3)[(1, 2, 3)];
VM621: 9(2)[(1, 2)]; // this is because pass by reference it will modify original array

// proper way of doing it should be like this
function getNewArr(arr) {
  const newArr = [].concat(arr);
  newArr.pop();
  return newArr;
}
```
