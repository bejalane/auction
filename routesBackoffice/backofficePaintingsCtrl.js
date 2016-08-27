//Authenticate the user and get a JWT
var express  = require('express');
var router   = express.Router();
var config = require('../config/main');
var User = require('../app/models/user');
var Paintings = require('../app/models/paintingsModel');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var tools = require('../tools/tools');
var multer = require('multer');



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/paintings')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

var upload = multer({ storage: storage }).array('paintings',12);


router.post('/uploadNewPainting', tools.jwtAuthAdmin, function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      	res.json({success: false, message: 'Faled upload', error: err});
      return
    }
    //console.log(req.files);

    res.json({innerCode: 0, success: true, message: 'Successfully uploaded!!!', file: req.files});
  });
});

router.post('/saveNewPaintings', tools.jwtAuthAdmin, function (req, res) {
  console.log(req.body);
  var newPaintings = new Paintings({
    name: req.body.name,
    description: req.body.description,
    season: req.body.season,
    pics: req.body.pics
  });
  
  newPaintings.save(function(err){
    if(err){
      return res.json({innerCode: 1000, success: false, message: 'That was an error occured'})
    }
    res.json({innerCode: 0, success: true, message: 'The paintings were successfully saved!'});
  });
});

module.exports = router;