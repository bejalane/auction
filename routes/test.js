//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var config = require('../config/main');
var User = require('../app/models/user');
var jwt = require('jsonwebtoken');
var tools = require('../tools/tools');

router.post('/', tools.jwtAuth, function(req, res){
	res.send({innerCode: 0, message: "Successfully authorised"});
}); 

module.exports = router;