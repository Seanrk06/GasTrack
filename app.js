//jshint esversion:6

const express = require("express");
const app = express();
const path = require('path');

<<<<<<< HEAD

app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use('/build/', express.static(path.join(__dirname, '/node_modules/three/build')));

app.use('/jsm', express.static(path.join(__dirname + '/node_modules/three/examples/jsm')));
=======
app.use(express.static("public"));

app.use(express.json());

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
>>>>>>> da92fd5014af557f82135920681a7bcb398af0be

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
  res.render("tracker", {});
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000.");
});
