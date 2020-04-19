const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;

  const updateBody = Object.keys(req.body);
  const allowedProperties = ["name", "age"];
  const isValidUpdate = updateBody.every((item) => {
    return allowedProperties.includes(item);
  });

  if (!isValidUpdate) {
    return res.status(400).send({
      error: "Invalid properties to update",
    });
  }

  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      // true to return the modified document rather than the original. defaults to false
      runValidators: true,
      //  if true, runs update validators on this command. Update validators validate the update operation against the model's schema.
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
