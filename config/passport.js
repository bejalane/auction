var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../app/models/user');
var config = require('../config/main');

module.exports = function(passport){
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done){
		//console.log(jwt_payload);
		//console.log({id: jwt_payload._doc._id});
		//console.log({'_id': jwt_payload.id});
		User.findById(jwt_payload._doc._id, function(err, user){
			if(err){
				return done(err, false);
			}
			if(user){
				console.log(user);
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
};