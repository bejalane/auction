//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var tools = require('../tools/tools');
var Catalogue = require('../app/models/catalogue');

router.get('/getAllCatalogues', function(req, res){
	Catalogue.find({}, function (err, docs) {
		if(err){
			return res.json({success: false, code: 1000, message: 'Can not get catalogues from db'});
		}
        res.json({success: true, code: 0, data: docs});
    });
});

module.exports = router;