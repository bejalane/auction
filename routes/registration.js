//Register new users
var express  = require('express');
var router   = express.Router();
var User = require('../app/models/user');

router.post('/', function(req, res){
	if(!req.body.email || !req.body.password){
		res.json({success: false, message: 'Please enter an email and password to register'});
	} else {
		var newUser = new User({
			email: req.body.email,
			password: req.body.password
		});

		//Attempt tp save the new user
		newUser.save(function(err){
			if(err){
				return res.json({success: false, message: 'That email address already exists'})
			}
			res.json({success: true, message: 'Successfully created new user'});
		});
	}
});

module.exports = router;