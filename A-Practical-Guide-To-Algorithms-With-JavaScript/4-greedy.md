Greedy Algorithm (need review)

```js
// Write a function, makeChange that returns an integer that represents the least number of coins that add up to an amount where the amount is always divisible by 5.
// Our Greedy Approach
// Always substract the largest coin possible from the current amount
// local optimize solution maybe not the global optimize solution
// if the question like this
// makeChange([1,6,10], 12)
//  6 + 6 = 2 (should be two coin)
//  but below solution will get the biggest which is 10
//    then since 12 - 10 = 2 (which is less than coins[1] 6)
//    so it will go for 1 instead 6
//    in the end result is 10 + 1 + 1 = 12 (which using 3 coin in total)
// so we say greedy might not be the global optimize solution

const makeChange = (coins, amount) => {
  coins.sort((a, b) => {
    return b - a;
  });
  let coinTotal = 0;
  let i = 0;
  while (amount > 0) {
    if (coins[i] <= amount) {
      amount = amount - coins[i];
      coinTotal++;
    } else {
      i++;
    }
  }
  return coinTotal;
};

makeChange([5, 10, 25], 50);
```

Brute Force (Getting all possible combination, need review)

```js
const coins = [10, 6, 1];

const makeChangeBF = value => {
  if (value === 0) {
    return 0;
  }
  let minCoins;
  coins.forEach(coin => {
    if (value - coin >= 0) {
      // makeChangeBF(6)
      let currMinCoins = makeChangeBF(value - coin);
      if (minCoins === undefined || currMinCoins < minCoins) {
        minCoins = currMinCoins;
      }
    }
  });
  return minCoins + 1;
};

makeChangeBF(12);
```
