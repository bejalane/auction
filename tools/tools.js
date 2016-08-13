//Tools
var passport = require('passport');

module.exports = {
  jwtAuth: function (req, res, next){
	  	//Authentication with Passport
	    passport.authenticate('jwt', { session: false }, function(err, user, info) { 
	        if (err) { return next(err); } 
	        if (!user) { return res.send({innerCode: 401, message: "is unauthorised"}).end(); } 
	        // edit as per comment
	        //return res.send("Test Route Accessed").end(); 
	        next();
	    })(req, res, next);
	}
};
