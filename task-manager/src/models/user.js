const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Task = require("./task");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  // owner object id on the task and this is associated with the
  // id of the user here
  foreignField: "owner",
  // for task perspective this is foreign field not own by
  // himself
});

// behind the scene res.send using JSON.stringify
// Whenever you call JSON.stringify on an object,
// it will call its toJSON method if it exists.
// so we basically overwrite toJSON method

userSchema.methods.toJSON = function () {
  const user = this;

  // here from string to object
  const userObject = user.toObject();

  // then from object we delete
  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

// Instance Methods State Here
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  // sign will return token
  // accept two params first is identifier, second is secret word
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

// Model Methods State Here
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }

  // user password here is db one
  // password is where the user enter login
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user;
};

// pre is before userSchema action while post is after userSchema action
// userSchema.pre
// userSchema.post

userSchema.pre("save", async function (next) {
  // we not using arrow function because arrow not bind this
  // this is the object when user save action occured
  const user = this;

  // isModified is a method that check whether update the user properties
  // here we can check if modified password
  if (user.isModified("password")) {
    // bcrypt.hash return promise so we use await
    // first params is user plain password
    // second is the round the algo run to hash password (8 is recommend)
    user.password = await bcrypt.hash(user.password, 8);
  }

  // if not using next the function wont continue execute
  next();
});

userSchema.pre("remove", async function (next) {
  const user = this;
  await Task.deleteMany({
    owner: user._id,
  });
  next();
});

// behind the scene second argument is using schema
// now by define schema ourself we can use middleware
const User = mongoose.model("User", userSchema);

module.exports = User;
