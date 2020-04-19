const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: {
    type: String,
    default: 0,
  },
});

module.exports = User;

// const ali = new User({
//   name: "Ali",
// });

// ali
//   .save()
//   .then(() => console.log(ali))
//   .catch((error) => {
//     console.log("error", error);
//   });
