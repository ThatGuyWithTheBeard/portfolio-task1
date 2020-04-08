var express = require('express');
var router = express.Router();
//import data from "../data.json";
const data = require("../data.json");
//const fs = require("fs");

/* GET home page. */
router.get('/', function(request, response, next) {
  //res.render("index", data);
  response.render("index", data);

  /* fs.readFile("../views/index.jade", null, (error, data) => {

    if(error) {
      console.log("There was an error!");
      throw error;
    } else {
      res.render(data);
    }

  }) */

});

router.put("/",)

router.get("/login", (request, response, next) => {

  response.render("login");
  
})

router.get("/chat", (request, response, next) =>{

  response.render("chat");
  
});

module.exports = router;
