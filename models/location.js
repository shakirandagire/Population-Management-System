    
var mongoose = require('mongoose');

var locationSchema = mongoose.Schema({
  name: { type: String, required: true },
  females: { type: Number, required: true },
  males: { type: Number, required: true },
  parent_location: { type: String, required: false },
});

module.exports = mongoose.model('Location', locationSchema);