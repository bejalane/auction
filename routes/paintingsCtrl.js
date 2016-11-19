//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var tools = require('../tools/tools');
var Paintings = require('../app/models/paintingsModel');

router.get('/getPaintingsBySeason/:id', function(req, res){
	console.log(req.params.id);
	Paintings.find({'season': req.params.id}, function (err, docs) {
		if(err){
			return res.json({success: false, code: 1000, message: 'Can not get catalogues from db'});
		}
		console.log(docs);
        res.json({success: true, code: 0, data: docs});
    });
});


module.exports = router;