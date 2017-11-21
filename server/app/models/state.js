var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var StateSchema = new mongoose.Schema({
  name: { 
  	type: String, 
  	default: '', 
  	required: true, 
  	index:{ unique:true }
  },
  image: String,
  density: String,
  districts: String,
  capital: String,
  sex_ratio: String,
  languages: String,
  map: String,
  latitude: String,
  longitude: String,
  description: String,
  area: String,
  continent_key: String,
  country_key: String,
  state_key:String
});
// Saves
StateSchema.pre('save', function (next) {  
  var State = this;
  next();
});

module.exports = mongoose.model('State', StateSchema);  