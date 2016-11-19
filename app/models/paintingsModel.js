var mongoose = require('mongoose');

//Catalogue Schema
var PaintingsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true
	},
	season: {
		type: String,
		required: true,
		unique: false
	},
	pics: [{
		main: {type: Boolean, required: true},
		name: {type: String, required: true},
		path: {type: String, required: true}
	}]
});

module.exports = mongoose.model('Paintings', PaintingsSchema);