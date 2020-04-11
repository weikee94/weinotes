const path = require("path");
const express = require("express");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather APP",
    name: "Wei",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About APP",
    name: "Wei",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "Help message",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    location: "Johor",
    forecast: "Snowing",
  });
});

app.listen(3000, () => {
  console.log("app running");
});
