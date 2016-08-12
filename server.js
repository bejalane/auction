var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./config/main');
var User = require('./app/models/user');
var jwt = require('jsonwebtoken');

//Use client side with folder public
app.use(express.static(__dirname + "/public"));

//use body-parser to get POST request fot API use
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

/*---API ROUTES---*/

//Register new users
app.use('/api/register' , require('./routes/registration'));
//Authenticate the user and get a JWT
app.use('/api/authenticate' , require('./routes/authenticate'));
//TEST JWT
apiRoutes.post('/test', passport.authenticate('jwt', {session: false}), function(req, res){
	console.log('test is working');
	res.send('It Worked! User id is: ' + req.user._id + '.');
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