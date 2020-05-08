const express = require('express');
const router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {

});

router.post('/login', function(req, res, next) { // localhost:4000/users
  
  console.log("POST to /users/login triggered");
  console.log(req.body);

  	User.findOne({ name: req.body.name }, (err, user) => {
    
    	console.log(user);

    	if(err) {
    		console.log(err);
    		res.send(err);
    	}

    	// FIXME Missing an error handler or something else that denotes that no object was found in the database
    	if(user !== null) {
			if(req.body.name === user.get("name") && req.body.password === user.get("password")) {

		        console.log(`Name "${user.get("name")}" and password "${user.get("password")}" match!`);
                res.send(user);
                
			} else {
				console.log(`Name "${user.get("name")}" and password "${user.get("password")}" don't match!`);
				res.status(401).send({ message: "Password is incorrect" });
			}

		} else {
			res.status(404).send({ message: "Username doesn't exist." });
		}

	}).catch(next);
});

router.post("/register", (req, res, next) => {

	console.log("POST to /users/register triggered");

	User.create(req.body).then((user) => { // TODO This could be easier to read with async/await
		res.json(user);
	}).catch(next);
});

module.exports = router;
