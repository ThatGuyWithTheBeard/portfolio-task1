const express = require('express');
var router = express.Router();
//import data from "../data.json";
//const data = require("../data.json");
//const fs = require("fs");


// Get 
router.get("/", (req, res) => {

  res.redirect("/login");
  
});

/* GET home page. */
router.get('/index', (req, res) => {
  //res.render("index", data);
  res.render("index"/* , data */);

  /* fs.readFile("../views/index.jade", null, (error, data) => {

    if(error) {
      console.log("There was an error!");
      throw error;
    } else {
      res.render(data);
    }

  }) */

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

router.get("/login", (req, res) => {

  res.render("login");
  
})

router.post("/login", (req, res) => {

  console.log(req.body);
  res.send({ 
    type: "POST",
    username: req.body.username,
    password: req.body.password
  })
  
})

router.get("/chat", (req, res) =>{

  res.render("chat");
  
});

module.exports = router;
