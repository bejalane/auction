//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var config = require('../config/main');
var User = require('../app/models/user');
var jwt = require('jsonwebtoken');
var tools = require('../tools/tools');

router.post('/', tools.jwtAuth, function(req, res){
	// req.session.destroy(function (err) {
	//     //res.redirect('/'); //Inside a callback… bulletproof!
	//     res.send({innerCode: 0, message: "Successfully logged out"})
	//   });
req.logout();
	res.send({innerCode: 0, message: "401 Successfully logged out"})
}); 

module.exports = router;