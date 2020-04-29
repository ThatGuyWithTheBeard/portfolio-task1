const express = require('express');
const router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    type: "GET",
    data: "GET from /users"
  });
});
router.post('/', function(req, res, next) {
  
  console.log("POST at /users triggered");
  //console.log(req.body);
  User.create(req.body).then((user) => { // TODO This could be easier to read with async/await
    res.json(user);
  }).catch(next);

  res.end(req.body);

});

module.exports = router;
