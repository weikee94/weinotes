const express = require("express");

const app = express();

app.get("", (req, res) => {
  res.send("hello express");
});

app.get("/help", (req, res) => {
  res.send("this is help page");
});

app.get("/about", (req, res) => {
  res.send("this is about page");
});

app.get("/weather", (req, res) => {
  res.send("this is weather page");
});

app.listen(3000, () => {
  console.log("app running");
});
