var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var ContinentSchema = new mongoose.Schema({
  name: { type: String, default: '', required: true, index:{ unique:true }},
  image: String,
  description: String,
  area: String,
  continent_key: String,
  country_count: String
});

// Saves
ContinentSchema.pre('save', function (next) {  
  var Continent = this;
  next();
});

module.exports = mongoose.model('Continent', ContinentSchema);  

