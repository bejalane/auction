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
	},
	maxBidPrice: {
		type: Number,
		required: false
	},
	maxSecondBidPrice: {
		type: Number,
		required: false
	},
	leader: {
		type: String,
		required: false
	},
	leaderId: {
		type: String,
		required: false
	},
	previous: {
		type: String,
		required: false
	},
	previousId: {
		type: String,
		required: false
	}
});

module.exports = mongoose.model('Price', PriceSchema);