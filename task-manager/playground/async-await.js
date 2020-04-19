const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        return reject("number must be positive");
      }
      resolve(a + b);
    }, 5000);
  });
};

// using async await
const doWork = async () => {
  const sum = await add(5, 10);
  const sum2 = await add(sum, -2);
  const sum3 = await add(sum2, 20);
  return sum3;
};

doWork()
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
