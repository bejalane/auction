//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var tools = require('../tools/tools');
var Catalogue = require('../app/models/catalogue');

router.post('/addNewCatalogue', tools.jwtAuthAdmin, function(req, res){
	console.log(req.body);

	var newCatalogue = new Catalogue({
		name: req.body.name,
		from: req.body.from,
		to: req.body.to
	});
	
	newCatalogue.save(function(err){
		if(err){
			return res.json({success: false, message: 'That catalogue already exists'})
		}
		res.json({success: true, message: 'Successfully created new catalogue'});
	});
}); 

router.get('/getAllCatalogues', tools.jwtAuthAdmin, function(req, res){
	Catalogue.find({}, function (err, docs) {
		if(err){
			return res.json({success: false, message: 'Can not get catalogues from db'});
		}
        res.json(docs);
    });
});

module.exports = router;