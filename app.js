//jshint esversion:6

const express = require("express");
const webscraper = require("./webscraper");

const app = express();

let data;

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
  res.render("index", {});
});
app.get("/about", function (req, res) {
  res.render("about", {});
});

app.get("/help", function (req, res) {
  res.render("help", {});
});

app.get("/track", function (req, res) {
  const city = "santa barbara";
  const state = "california";
  webscraper.scrapeGasPriceData(city, state);
  gasData = require("./data/gasStations.json");
  res.render("tracker", { data: gasData, city: city, state: state });
});

app.post("/track", async (req, res) => {
  const city = req.body.city;
  const state = req.body.state;
  webscraper.scrapeGasPriceData(city, state);
  gasData = require("./data/gasStations.json");
  res.render("tracker", { data: gasData, city: city, state: state });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000.");
});
