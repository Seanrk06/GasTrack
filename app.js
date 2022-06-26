//jshint esversion:6

const express = require("express");
const webscraper = require("./webscraper");

const app = express();

// app.use('/build/', express.static(path.join(__dirname, '/node_modules/three/build')));
// app.use('/jsm', express.static(path.join(__dirname + '/node_modules/three/examples/jsm')));

const response = {
  city: String,
  state: String,
};

app.use(express.static("public"));

app.use(express.json());

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.render("home", {});
});

app.get("/about", function (req, res) {
  res.render("about", {});
});

app.get("/help", function (req, res) {
  res.render("help", {});
});

app.get("/track", function (req, res) {
  console.log(response);
  res.render("tracker", { Data: response });
});

app.post("/track", (req, res) => {
  const city = req.body.city.replace(" ", "-");
  const state = req.body.state.replace(" ", "-");
  response.city = city;
  response.state = state;
  webscraper.scrapeGasPriceData(city, state);
  res.render("tracker", {});
  res.sendFile(path.join(__dirname, "./data/gasStations.json"));
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000.");
});
