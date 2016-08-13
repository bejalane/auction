var mongoose = require('mongoose');

//Catalogue Schema
var CatalogueSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	from: {
		type: Date,
		required: true
	},
	to: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Catalogue', CatalogueSchema);