const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    // there are two ways to do
    // method one
    // const tasks = await Task.find({
    //   owner: req.user._id,
    // });
    // res.send(tasks);

    // method two
    // await req.user.populate("tasks").execPopulate();
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({
      _id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  // make it array and compare using every and includes method
  const updateBody = Object.keys(req.body);
  const allowedProperties = ["description", "completed"];
  const isValidUpdate = updateBody.every((item) => {
    return allowedProperties.includes(item);
  });

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid properties to update" });
  }

  try {
    // version one without middleware
    // const task = await Task.findByIdAndUpdate(_id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    // with middleware
    const task = await Task.findOne({
      _id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send();
    }

    updateBody.forEach((update) => {
      task[update] = req.body[update];
    });

    await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await Task.findByIdAndDelete(_id);
    const task = await Task.findOneAndDelete({
      _id,
      owner: req.user._id,
    });
    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
