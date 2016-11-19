var mongoose = require('mongoose');

//Catalogue Schema
var PriceSchema = new mongoose.Schema({
	paintingId: {
		type: String,
		required: true,
		unique: true
	},
	startPrice: {
		type: Number,
		required: true
	},
	currentPrice: {
		type: Number,
		required: false
	},
	reservePrice: {
		type: Number,
		required: true
	}
});

module.exports = mongoose.model('Price', PriceSchema);