//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var config = require('../config/main');
var User = require('../app/models/user');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res){
	console.log(req.body.email);
	User.findOne({
		email: req.body.email
	}, function(err, user){
		console.log(user);
		if(err) throw err;
		if(!user){
			res.send({code: 4001, success: false, message: 'Authentication failed. User not found'});
		} else {
			//Check if the password macthes
			user.comparePassword(req.body.password, function(err, isMatch){
				if(isMatch && !err){
					var token = jwt.sign(user, config.secret, {
						expiresIn: 10000//in seconds
					});
					var userObj = {};
					userObj.name = user.name;
					userObj.id = user._id;
					res.json({code: 0, success: true, token: 'JWT ' + token, user: userObj});
				} else {
					res.send({code: 4002, success: false, message: 'Authentication failed. Password did not match.'});
				}
			});
		}
	});
});

module.exports = router;