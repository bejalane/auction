//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var tools = require('../tools/tools');
var Paintings = require('../app/models/paintingsModel');
var Price = require('../app/models/price');
var async = require('async');

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


module.exports = router;