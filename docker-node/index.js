const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hi Hi hi hi");
});

app.listen(8080, (req, res) => {
  console.log("App running");
});
