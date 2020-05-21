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

router.get("/:id/load-user", (req, res, next) => {

    console.log("_id from params when loading user data:", req.params.id);
    console.log(req.params);

    User.findById(req.params.id, (err, user) => {

        if(err) {
            console.log(err);
            res.send(err);
        }
        console.log(user);
        res.send(user);
    });
});

router.post("/:id/move-item-to-user", (req, res, next) => {

    console.log(req.body);
    User.findById(req.params.id, (err, user) => {

        if(err) {
            console.log(err); 
            res.send(err);
        }
        user.items.push(req.body.item);
        user.save().then(() => {
            res.send(user);
        });
        console.log(`New item "${req.body.item.name}" for user:`, user.items);
    });
    Room.findById(req.body.roomId, (err, room) => {

        if(err) {
            console.log(err); 
            res.send(err);
        }

        room.items.id(req.body.item._id).remove();
        room.save().then(() => {
            console.log(`Item "${req.body.item.name}" has been removed from the room.`);
        });
    });
});

router.post("/:id/move-item-to-room", (req, res, next) => {

    console.log(req.body);

    User.findById(req.params.id, (err, user) => {
        if(err) {
            console.log(err); 
            res.send(err);
        }

        user.items.id(req.body.item._id).remove();
        user.save().then(() => {
            res.send(user);
        })
        console.log(`Dropped item "${req.body.item.name}" for user:`, user.items);
    });

    Room.findById(req.body.roomId, (err, room) => {
        if(err) {
            console.log(err); 
            res.send(err);
        }

        room.items.push(req.body.item);
        room.save().then(() => {
            console.log(`Item "${req.body.item.name}" has been dropped in the room.`);
        });
    });
});

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

router.get("/:id/room", (req, res, next) => {

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
});

router.get("/:id/room/:locationIndex", (req, res, next) => {

    console.log("Requested locationIndex: ", req.params.locationIndex);

    Room.findOne({ locationIndex: req.params.locationIndex }, (err, room) => {

        if(err) {
            console.log(err);
            res.send(err);
        }
        console.log(room);

        if(room === null) {
            res.send({ message: { forward: "You can't move any further forward", back: "You can't move any further back" } });
        } else {
            User.findByIdAndUpdate(req.params.id, { room: room.name }, { new: true }, (userErr, user) => {
    
                if(userErr) {
                    console.log(userErr);
                    res.send(userErr);
                }
                console.log(user);
    
                res.send(user);
            });
        }
    });/* .catch(next); */
});

router.get("/login", (req, res) => {

  res.render("login");
  
});

router.get("/register", (req, res) => {

  res.render("register");
  
});

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
