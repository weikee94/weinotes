const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials/");

// setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup html file
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
    title: "Help title",
    msg: "Help message",
    name: "Wei",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    location: "Johor",
    forecast: "Snowing",
  });
});

app.get("/help/*", (req, res) => {
  res.render("notfound", {
    title: "Help article not found",
    msg: "Help article not found",
    name: "Wei",
  });
});

app.get("*", (req, res) => {
  res.render("notfound", {
    title: "Not found page",
    msg: "Page not found",
    name: "Wei",
  });
});

app.listen(3000, () => {
  console.log("app running");
});
