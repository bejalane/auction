//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var tools = require('../tools/tools');
var Paintings = require('../app/models/paintingsModel');
var Price = require('../app/models/price');
var Bid = require('../app/models/bid');
var async = require('async');
var socketio = require('socket.io');

exports = module.exports = function(io){
var socketCount = 0;
io.on('connection', function (socket) {

	// Socket has connected, increase socket count
    socketCount++
    console.log('connections:' + socketCount);

    socket.on('requestBids', function(data){
    	Bid.find({'paintingId': data.id}, function (err, docs) {
			if(err){
				return res.json({success: false, code: 1000, message: 'Can not get catalogues from db'});
			}
	        socket.emit('bids', {success: true, code: 0, data: docs})
	    });
    });
 
    socket.on('disconnect', function() {
        socketCount--
        console.log('connections:' + socketCount);
    })
 
});

router.get('/getPaintingsBySeason/:id', function(req, res){
	Paintings.find({'season': req.params.id}, function (err, docs) {
		if(err){
			return res.json({success: false, code: 1000, message: 'Can not get catalogues from db'});
		}
        res.json({success: true, code: 0, data: docs});
    });
});

function getPainting(id, callback){
	Paintings.find({'_id': id}, callback);
}

function getPrice(id, callback){
	Price.find({'paintingId': id}, callback);
}


router.get('/getSinglePainting/:id', function(req, res){
	var queryId = req.params.id;
	async.parallel({
	    painting: async.apply(getPainting, queryId),
	    price: async.apply(getPrice, queryId)
	}, function (error, results) {
	    if (error) {
	      res.status(500).send(error);
	      return;
	    }
	    var responseObj = {};
	    responseObj.painting = results.painting[0];
	    responseObj.price = results.price[0];
	    res.json({success: true, code: 0, data: responseObj});
	});
});

router.get('/getBids/:id', function(req, res){
	Bid.find({'paintingId': req.params.id}, function (err, docs) {
		if(err){
			return res.json({success: false, code: 1000, message: 'Can not get catalogues from db'});
		}
        res.json({success: true, code: 0, data: docs});
    });
});

router.post('/setBid', tools.jwtAuth, function(req, res){
	var newBid = new Bid({
		paintingId: req.body.paintingId,
		bid: req.body.bid,
		userId: req.body.userId,
		userName: req.body.userName,
		date: Date.now()
	});
	
	newBid.save(function(err){
		if(err){
			return res.json({success: false, message: 'That bid wasnot saved'})
		}
		res.json({success: true, message: 'Successfully added new bid'});
		console.log('Successfully added new bid');

		Bid.find({'paintingId': req.body.paintingId}, function (err, docs) {
			if(err){
				return res.json({success: false, code: 1000, message: 'Can not get catalogues from db'});
			}
			console.log('fetching bids after set new');
		    io.sockets.emit('newbids', {success: true, code: 0, data: docs})
		});


	});
});

return router;

}

