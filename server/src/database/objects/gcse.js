var mongoose = require ("mongoose");

var gcseSchema = new mongoose.Schema({
	subject: { type: String, required: true },
	grade: { type: String, required: true }
});

module.exports = mongoose.model('GCSE', gcseSchema);