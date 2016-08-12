var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./config/main');
var User = require('./app/models/user')
var jwt = require('jsonwebtoken');

//Use client side with folder public
app.use(express.static(__dirname + "/public"));

//use body-parser to get POST request fot API use
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Log requests to console
app.use(morgan('dev'));

//Init passport
app.use(passport.initialize());

//Connect to db
mongoose.connect(config.database);

//Bring in passport strategy
require('./config/passport')(passport);

//Create api group routes
var apiRoutes = express.Router();

//Register new users
apiRoutes.post('/register', function(req, res){
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

//Authenticate the user and get a JWT
apiRoutes.post('/authenticate', function(req, res){
	User.findOne({
		email: req.body.email
	}, function(err, user){
		if(err) throw err;
		if(!user){
			res.send({success: false, message: 'Authentication failed. User not found'});
		} else {
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
		}
	});
});

//Protect dashbord route with JWT
apiRoutes.get('/dashboard', passport.authenticate('jwt', {session: false}), function(req, res){
	res.send('It Worked! User id is: ' + req.user._id + '.');
}); 

// Set url for API group routes
app.use('/api', apiRoutes);

//home route
app.get('/', function(req, res){
	res.send('This is home page');
});


var port = ('3000');

app.listen(port);
console.log('Server is running on port ' + port);