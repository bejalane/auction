//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var config = require('../config/main');
var User = require('../app/models/user');
var jwt = require('jsonwebtoken');
var tools = require('../tools/tools');

router.get('/', tools.jwtAuthAdmin, function(req, res){
	res.send({innerCode: 0, message: "User is logged in as admin"});
}); 

module.exports = router;