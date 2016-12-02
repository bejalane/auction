var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var config = require('./config/main');
var User = require('./app/models/user');
var jwt = require('jsonwebtoken');

//var bids = require('./routes/bids')(io);


// io.on('connection', function (socket) {

// 	// Socket has connected, increase socket count
// 	console.log('USER CONNECTED!');

 
//     socket.on('disconnect', function() {
//         // Decrease the socket count on a disconnect, emit
//         console.log('USER DISCONNECTED!');

//     });
 
// });


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
//Logout
app.use('/api/logout' , require('./routes/logout'));
//TEST JWT
app.use('/api/test' , require('./routes/test'));

//APPLICATION
app.use('/api/catalogue' , require('./routes/cataloguesCtrl'));
app.use('/api/paintings' , require('./routes/paintingsCtrl')(io));


//BACKOFFICE
//Authenticate backoffice admin and get a JWT
app.use('/api/backoffice/login' , require('./routesBackoffice/backofficeLogin'));
//Logout from backoffice
app.use('/api/backoffice/logout' , require('./routesBackoffice/backofficeLogout'));
//Check Logged In Admin from backoffice
app.use('/api/backoffice/checkLoggedIn' , require('./routesBackoffice/backofficeCheckLogin'));
//Catalogue controller from backoffice
app.use('/api/backoffice/catalogue' , require('./routesBackoffice/backofficeCataloguesCtrl'));
//Painting controller from backoffice
app.use('/api/backoffice/paintings' , require('./routesBackoffice/backofficePaintingsCtrl'));


//home route
app.get('/', function(req, res){
	res.send('This is home page');
});


var port = ('3000');

http.listen(port);
console.log('Server is running on port ' + port);