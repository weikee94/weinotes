Dynamic Programming (need review)
DP Qualities

- Optimal Subsctructure (tends to be recursive)
- Overlapping Subproblems

DP Approaches

- Top Down(Recursive)
- Bottom Up(Iterative)

```js
let cache = {};
const coins = [10, 6, 1];

const makeChangeDP = value => {
  if (value === 0) {
    return 0;
  }
  if (cache[value]) {
    return cache[value];
  }
  let minCoins = -1;
  coins.forEach(coin => {
    if (value - coin >= 0) {
      let currMinCoins = makeChangeDP(value - coin);
      if (minCoins === undefined || currMinCoins < minCoins) {
        minCoins = currMinCoins;
      }
    }
  });
  // save the value into the cache
  cache[value] = minCoins + 1;
  return cache[value];
};

makeChangeDP(12);
```
