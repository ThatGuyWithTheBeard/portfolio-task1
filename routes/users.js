const express = require('express');
const router = express.Router();
const Ninja = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({
    type: "GET",
    data: "GET from /users"
  });
});
router.post('/', function(req, res, next) {
  Ninja.create(req.body).then((ninja) => { // TODO This could be easier to read with async/await
    res.send(ninja);
  }).catch(next);

});

module.exports = router;
