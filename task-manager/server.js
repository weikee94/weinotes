const express = require("express");
const connectDB = require("./config/db");

const userRouter = require("./src/routers/user");
const taskRouter = require("./src/routers/task");

const port = process.env.PORT;

const app = express();
app.use(express.json()); // json body usage

// connect database
connectDB();
app.use(userRouter);
app.use(taskRouter);

app.get("/", (req, res) => res.send("API RUNNING"));

app.listen(port, () => console.log(`server running ${port}`));
