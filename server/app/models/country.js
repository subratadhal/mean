var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var CountrySchema = new mongoose.Schema({
  name: { 
  	type: String, 
  	default: '', 
  	required: true, 
  	index:{ unique:true }
  },
  image: String,
  flag: String,
  map: String,
  territory: String,
  description: String,
  capital: String,
  area: String,
  continent_key: String,
  country_key: String
});

// Saves
CountrySchema.pre('save', function (next) {  
  var Country = this;
  next();
});


module.exports = mongoose.model('Country', CountrySchema);  