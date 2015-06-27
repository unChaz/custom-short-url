var mongoose  = require('mongoose');
var Schema 	  = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var URL = new Schema({
  alias: { type: String, unique: true },
  url: { type: String}
});

module.exports = mongoose.model('URL', URL );
