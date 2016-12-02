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

    socket.on('setNewBid', function(data){
    	var newBid = new Bid({
			paintingId: data.paintingId,
			bid: data.bid,
			userId: data.userId,
			userName: data.userName,
			date: data.date
		});
		
		newBid.save(function(err){
			if(err){
				return res.json({success: false, message: 'That bid wasnot saved'})
			}

			Bid.find({'paintingId': data.paintingId}, function (err, docs) {
				if(err){
					return res.json({success: false, code: 1000, message: 'Can not get catalogues from db'});
				}
		        io.sockets.emit('newbids', {success: true, code: 0, data: docs})
		    });

		});
    });
 
    socket.on('disconnect', function() {
        socketCount--
        console.log('connections:' + socketCount);
    })
 
});


// router.get('/getBids/:id', function(req, res){
// 	Bid.find({'paintingId': req.params.id}, function (err, docs) {
// 		if(err){
// 			return res.json({success: false, code: 1000, message: 'Can not get catalogues from db'});
// 		}
//         res.json({success: true, code: 0, data: docs});
//     });
// });

// router.post('/setBid', function(req, res){
// 	var newBid = new Bid({
// 		paintingId: req.body.paintingId,
// 		bid: req.body.bid,
// 		userId: req.body.userId,
// 		userName: req.body.userName,
// 		date: req.body.date
// 	});
	
// 	newBid.save(function(err){
// 		if(err){
// 			return res.json({success: false, message: 'That bid wasnot saved'})
// 		}
// 		res.json({success: true, message: 'Successfully added new bid'});
// 	});
// });


}