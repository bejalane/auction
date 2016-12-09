//jwtauth.js - not usefull
var express  = require('express');
var router   = express.Router();
var config = require('../config/main');
var User = require('../app/models/user');
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
	var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

	// console.log(req);
	// console.log(req.body);

	if (token) {
	  try {
	    var decoded = jwt.decode(token, config.secret);

	    // handle token here

	  } catch (err) {
	    return next();
	  }
	} else {
	  next();
	}

	if (decoded.exp <= Date.now()) {
	  res.end('Access token has expired', 400);
	}

	User.findOne({ _id: decoded.iss }, function(err, user) {
	  req.user = user;
	});
};