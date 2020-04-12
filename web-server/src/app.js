const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

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
    title: "About",
    name: "Wei",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "Anything.",
    name: "Wei",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a address value",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          location: location,
          forecast: forecastData,
          address: req.query.address,
        });
      });
    }
  );
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
