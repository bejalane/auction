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

function auctionSteps(val){
	switch (true) {
		case (val >= 1 && val < 99):
	    	return 1;
	    	break;
	   	case (val >= 100 && val < 249):
	    	return 3;
	    	break;
	    case (val >= 250 && val < 499):
	    	return 5;
	    	break;
	    case (val >= 500 && val < 999):
	    	return 10;
	    	break;
	    case (val >= 1000 && val < 2499):
	    	return 25;
	    	break;
	    case (val >= 2500 && val < 4999):
	    	return 50;
	    	break;
	    case (val >= 5000):
	    	return 100;
	    	break;
	    default:
        	return 5;
	}	
}

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
	    responseObj.price = {};
	    responseObj.price.currentPrice = results.price[0].currentPrice;
	    responseObj.price.leader = results.price[0].leader;
	    responseObj.price.previous = results.price[0].previous;
	    responseObj.price.startPrice = results.price[0].startPrice;
	    res.json({success: true, code: 0, data: responseObj});
	});
});




router.get('/getBids/:id', function(req, res){
	Bid.find({'paintingId': req.params.id}, function (err, docs) {
		if(err){
			return res.json({success: false, code: 1000, message: 'Can not get bids from db'});
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
		//res.json({success: true, message: 'Successfully added new bid'});
		console.log(req.body.userName);
		console.log('Successfully added new bid');

	    

			Price.find({'paintingId': req.body.paintingId}, function (err, priceDocs) {
				if(err){
					return res.json({success: false, code: 1000, message: 'Can not get price from db'});
				}
		        //res.json({success: true, code: 0, data: docs});
		        console.log(priceDocs[0].currentPrice);
		        var newCurrentPrice;
				var newMaxBidPrice;
				var newMaxSecondBidPrice;
				// var newLeader = {};
				// var newPrevious = {};
				var updatePrice = {};
				if(req.body.bid > priceDocs[0].currentPrice){
			        if(priceDocs[0].maxBidPrice){
			        	if(req.body.bid > priceDocs[0].maxBidPrice) {
			        		console.log('1st case');
			        		updatePrice.maxBidPrice = req.body.bid;
			        		updatePrice.maxSecondBidPrice = priceDocs[0].maxBidPrice;
			        		updatePrice.currentPrice = priceDocs[0].maxBidPrice + auctionSteps(priceDocs[0].maxBidPrice);
			        		updatePrice.leader = req.body.userName;
			        		updatePrice.leaderId = req.body.userId;
			        		updatePrice.previous = priceDocs[0].leader;
				        	updatePrice.previousId = priceDocs[0].leaderId;
			        	} else {
			        		if(priceDocs[0].maxSecondBidPrice){
			        			if(req.body.bid >= priceDocs[0].maxSecondBidPrice) {
			        				console.log('2st case');
			        				updatePrice.maxSecondBidPrice = req.body.bid;
			        				updatePrice.currentPrice = req.body.bid + auctionSteps(req.body.bid);
				        			updatePrice.previous = req.body.userName;
				        			updatePrice.previousId = req.body.userId;
			        			} else {
			        				//Bid is less then max and secondMax
			        				return res.json({success: false, code: 601, message: 'Your bid is less then current price'});
			        			}
			        		} else {
			        			//In case of second bid
			        			console.log('3st case');
			        			updatePrice.maxSecondBidPrice = req.body.bid;
				        		updatePrice.currentPrice = req.body.bid + auctionSteps(req.body.bid);
				        		updatePrice.previous = req.body.userName;
				        		updatePrice.previousId = req.body.userId;
			        		}
			        	}
			        } else {
			        	//Case of first bid
			        	if(req.body.bid > priceDocs[0].currentPrice){
			        		console.log('4st case');
			        		updatePrice.maxBidPrice = req.body.bid;
			        		updatePrice.currentPrice = priceDocs[0].currentPrice + auctionSteps(priceDocs[0].currentPrice);
			        		updatePrice.leader = req.body.userName;
			        		updatePrice.leaderId = req.body.userId;

			        	} else {
			        		return res.json({success: false, code: 601, message: 'Your bid is less then start price'});
			        	}
			        }
			    } else {
			    	return res.json({success: false, code: 601, message: 'Your bid is less then start price'});
			    }


		        Price.update({'paintingId': req.body.paintingId}, { $set : updatePrice }, {upsert: true}, function( err, result ) {
				    if(err){
						return res.json({success: false, code: 1000, message: 'Can not update price from db'});
					}
					console.log(result);

					Price.find({'paintingId': req.body.paintingId}, function (err, lastPriceDocs) {
						if(err){
							return res.json({success: false, code: 1000, message: 'Can not get last price from db'});
						}
						console.log('fetching bids after set new');
						var priceObj = {};
						priceObj.currentPrice = lastPriceDocs.currentPrice;
						priceObj.leader = lastPriceDocs.leader;
						priceObj.previous = lastPriceDocs.previous;
						priceObj.startPrice = lastPriceDocs.startPrice;
			    		io.sockets.emit('lastprice', {success: true, code: 0, data: lastPriceDocs});
					});
					
				});

		    });


			// Bid.find({'paintingId': req.body.paintingId}, function (err, docs) {
			// 	if(err){
			// 		return res.json({success: false, code: 1000, message: 'Can not get catalogues from db'});
			// 	}
			// 	console.log('fetching bids after set new');
			//     io.sockets.emit('newbids', {success: true, code: 0, data: docs})
			// });




	});
});

return router;

}

