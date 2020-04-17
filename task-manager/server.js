const express = require("express");
const connectDB = require("./config/db");

const User = require("./src/models/user");
const Task = require("./src/models/task");

const PORT = 5000;

const app = express();
app.use(express.json()); // json body usage

// connect database
connectDB();

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.send(user))
    .catch((e) => res.status(400).send(e));
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then(() => res.send(task))
    .catch((e) => res.status(400).send(e));
});

app.get("/", (req, res) => res.send("API RUNNING"));

app.listen(PORT, () => console.log("server running"));
