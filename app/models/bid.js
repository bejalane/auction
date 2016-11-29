var mongoose = require('mongoose');

//Catalogue Schema
var BidSchema = new mongoose.Schema({
	paintingId: {
		type: String,
		required: true
	},
	bid: {
		type: Number,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	userName: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
});

module.exports = mongoose.model('Bid', BidSchema);