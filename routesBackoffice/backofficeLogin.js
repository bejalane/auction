//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var config = require('../config/main');
var User = require('../app/models/user');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res){
	User.findOne({
		email: req.body.email
	}, function(err, user){
		if(err) throw err;
		if(!user){
			res.send({success: false, message: 'Authentication failed. User not found'});
		} else {
			if(user.role === 'Admin'){
			//Check if the password macthes
				user.comparePassword(req.body.password, function(err, isMatch){
					if(isMatch && !err){
						var token = jwt.sign(user, config.secret, {
							expiresIn: 10000//in seconds
						});
						res.json({success: true, token: 'JWT ' + token});
					} else {
						res.send({success: false, message: 'Authentication failed. Password did not match.'});
					}
				});
			} else {
				res.send({success: false, message: 'Authentication failed. User is not an administrator.'});
			}
		}
	});
});

module.exports = router;