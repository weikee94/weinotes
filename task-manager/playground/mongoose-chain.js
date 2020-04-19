const connectDB = require("../config/db.js");
connectDB();

const User = require("../src/models/user");
const Task = require("../src/models/task");

User.findByIdAndUpdate("5e997bf9bc13613e8e92a9e5", {
  age: 12,
})
  .then((user) => {
    console.log(user);
    return User.countDocuments({ age: 0 });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });

Task.findByIdAndRemove("5e9825ff8383246fedd8bd06")
  .then((task) => {
    console.log(task);
    return Task.countDocuments({ completed: false });
  })
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
