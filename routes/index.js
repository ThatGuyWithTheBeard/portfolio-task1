var express = require('express');
var router = express.Router();
const data = require("../data.json");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index");
});

router.get("/data", (req, res) => {

  res.json(data);
  
});

module.exports = router;
