const mongoose = require("mongoose");

// User Collection
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

// 這個是instance of User (Document)
const ali = new User({
  name: "Ali", // field
  age: 27,
});

ali
  .save() // save to db dont have any params and it will return promise
  .then(() => {
    console.log(ali);
  })
  .catch((error) => {
    // handling promise error here
    console.log("Error: ", error);
  });
