const connectDB = require("../config/db.js");
connectDB();

const User = require("../src/models/user");
const Task = require("../src/models/task");

const updateUserId = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const userNumWithAge = await User.countDocuments({ age });

  return userNumWithAge;
};

updateUserId("5e997bf9bc13613e8e92a9e5", 12)
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });

const removeTaskId = async (id) => {
  const removeTask = await Task.findByIdAndDelete(id);
  const countCompleted = await Task.countDocuments({ completed: false });
  return countCompleted;
};

removeTaskId("5e9a88e6c44c6f184c2dfb83")
  .then((result) => {
    console.log(result);
  })
  .catch((e) => {
    console.log(e);
  });
