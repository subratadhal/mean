var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var DistrictSchema = new mongoose.Schema({
  name: { 
  	type: String, 
  	default: '', 
  	required: true, 
  	index:{ unique:true }
  },
  image: String,
  headquarters:String,
  density: String,
  sex_ratio: String,
  languages: String,
  map: String,
  latitude: String,
  longitude: String,
  description: String,
  area: String,
  continent_key: String,
  country_key: String,
  state_key:String,
  district_key:String
});

// Saves
DistrictSchema.pre('save', function (next) {  
  var District = this;
  next();
});


module.exports = mongoose.model('District', DistrictSchema);  