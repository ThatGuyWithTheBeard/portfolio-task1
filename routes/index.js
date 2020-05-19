const express = require('express');
var router = express.Router();
//import data from "../data.json";
//const data = require("../data.json");
//const fs = require("fs");
const User = require("../models/user");
const Room = require("../models/room");


// Get 
router.get("/", (req, res, next) => {

  //res.redirect("/login");
  res.render("landing-page");
  
});

/* GET home page. */

router.get('/:id/game', (req, res, next) => {

    console.log(req.params.id);
    
    User.findOne({ _id: req.params.id }, (err, user) => {

        res.render("game", user);
    });
});

router.get("/:id/create-room", (req, res, next) => {

    res.render("create-room");
});

router.post("/:id/create-room", (req, res, next) => {

    console.log(req.body);

    Room.create(req.body).then((room) => {
        res.json(room);
    }).catch(next);
    
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
