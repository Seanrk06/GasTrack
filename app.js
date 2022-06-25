//jshint esversion:6

const express = require("express");

const app = express();

app.use(express.json());

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("three", {});
});

app.get("/about", function(req, res){
    res.render("about", {}); 
});

app.get("/help", function(req, res){
    res.render("help", {}); 
});

app.listen(3000, function(){
    console.log("Server started on port 3000.");
});