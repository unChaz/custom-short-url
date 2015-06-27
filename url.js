var mongoose  = require('mongoose');
var Schema 	  = mongoose.Schema;
var ObjectId  = Schema.ObjectId;

var URL = new Schema({
  alias: { type: String, unique: true },
  url: { type: String},
  clicks: { type: Number, default: 0}
});

module.exports = mongoose.model('URL', URL );
