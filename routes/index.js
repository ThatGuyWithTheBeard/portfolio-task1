const express = require('express');
var router = express.Router();
//import data from "../data.json";
//const data = require("../data.json");
//const fs = require("fs");
const User = require("../models/user");


// Get 
router.get("/", (req, res, next) => {

  //res.redirect("/login");
  res.render("landing-page");
  
});

/* GET home page. */

// FIXME Update GET requests to be the same as in "task1"
router.get('/index', (req, res, next) => {
  //res.render("index", data);
  res.render("index"/* , data */);
});



router.get("/login", (req, res) => {

  res.render("login");
  
})

router.get("/register", (req, res) => {

  res.render("register");
  
})

router.get("/chat", (req, res) =>{

  res.render("chat");
  
});

/* router.post("/", (request, response) => {
  
  response.send({ type: "POST" });
  
});

router.put("/", (request, response) => {
  
  response.send({ type: "PUT" });
  
});

router.delete("/", (request, response) => {
  
  response.send({ type: "DELETE" });
  
}); */

module.exports = router;
