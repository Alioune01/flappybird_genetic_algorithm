const mongoose = require('mongoose');

var theSchema = mongoose.Schema({
	_id: mongoose.Types.ObjectId,
	theArray: String
}); //I intend to make one object per session and continue updating it with generations and the best from those generations

var smVar = module.exports = mongoose.model("v_0_1", theSchema);