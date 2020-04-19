const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 5000);
  });
};

// if many async cause nested happened
add(3, 4)
  .then((sum) => {
    console.log(sum);
    add(5, sum)
      .then((sum2) => console.log(sum2))
      .catch((e) => console.log(e));
  })
  .catch((e) => console.log(e));

// use promise chain can help
add(10, 2)
  .then((sum) => {
    console.log(sum);
    return add(sum, 20);
  })
  .then((sum2) => {
    // this sum2 is the resolve result from above return
    console.log(sum2);
  })
  .catch((e) => {
    console.log(e);
  });
