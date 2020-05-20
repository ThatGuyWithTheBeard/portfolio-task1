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
    
    User.findOne({ _id: req.params.id }, (err, user) => {

        res.render("game", user);
    });
});

router.get("/:id/create-room", (req, res, next) => {

    res.render("create-room");
});

router.post("/:id/create-room", (req, res, next) => {

    console.log(req.body);

    Room.countDocuments({}, (err, count) => {
        if(err) {
            console.log(err);
            res.send(err);
        }

        newRoom = Object.assign({}, req.body, { locationIndex: count })
        console.log(newRoom);

        Room.create(newRoom).then((room) => {
            res.json(room);
        }).catch(next);
    })

    
});

router.get("/rooms", (req, res, next) => {


    Room.find({}, (err, rooms) => {

        if(err) {
            console.log(err);
    		res.send(err);
        } 

        //console.log(rooms);

        roomNames = rooms.map(room => room.name); /* .filter(room => room !== startRoom) */
        console.log(roomNames);
        res.send(roomNames);
    });

});

router.post("/:id/rooms", (req, res, next) => {

    console.log(req.params.id);
    //console.log(req.body);

    User.findById(req.params.id, (userErr, user) => {

        console.log(user);

        if(userErr) {
    		console.log(userErr);
    		res.send(userErr);
        }
        Room.findOne({ name: user.room }, (roomErr, room) => {
            
            if(roomErr) {
                console.log(roomErr);
                res.send(roomErr);
            }

            console.log(room);
            
            res.send(room);
        });
    });

    // res.send({  })
})

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
