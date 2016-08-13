//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var config = require('../config/main');
var User = require('../app/models/user');
var jwt = require('jsonwebtoken');
var tools = require('../tools/tools');

router.post('/', tools.jwtAuthAdmin, function(req, res){
	req.logout();
	res.send({innerCode: 0, message: "401 Successfully logged out"});
}); 

module.exports = router;