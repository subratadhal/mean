var CountryModel = require('../models/country');
var bodyParser = require('body-parser');

exports.getCountry = function(req,res){
  CountryModel.find(function(err,result){
    if(err){
      res.json(err);
    }
    else{
      res.json(result);
    }
  });
};

exports.getSingleCountry = function(req,res){
  CountryModel.findById(req.params.id, function(err, country) {
      if (err) {
        return res.json({ success: false, message: 'Record not exists', Error: err });
      }
      if (country) {
        res.json(country);
      } else {
        return res.json({ success: false, message: 'Record not exists'});
      }
  });
};

exports.editCountry = function(req,res){
  var id1 = req.params.id; console.log(id1);
  CountryModel.findById(id1, function(err, doc) {
    if (err) {
        return res.json({ success: false, message: 'Record not exists', Error: err  });
      }
      if (doc) {
         if(doc._id == id1){
          
          var data = {
                name: req.body.name == undefined ?  doc.name : req.body.name,
                area: req.body.area == undefined ?  doc.area : req.body.area,
                image: req.body.image == undefined ?  doc.image : req.body.image,
                capital: req.body.capital == undefined ?  doc.capital : req.body.capital,
                flag: req.body.flag == undefined ?  doc.flag : req.body.flag,
                country_count: req.body.country_count == undefined ?  doc.country_count : req.body.country_count,
                description: req.body.description == undefined ?  doc.description : req.body.description,
                country_key: req.body.country_key == undefined ?  doc.country_key : req.body.country_key,
                continent_key: req.body.continent_key == undefined ?  doc.continent_key : req.body.continent_key
                }; 

             CountryModel.findByIdAndUpdate(id1, data, function(err, Country) {
                if (err) {
                  return res.json({ success: false, message: 'Record not Update.' });
                }
                if (Country) {
                  return res.json({ success: true, message: 'Record successfully edited.'});
                } else {
                  return res.json({ success: false, message: 'Record not Update.'});
                }
            });
         }
      } else {
        return res.json({ success: false, message: 'Please enter valid ID.'});
      }
  });
};
exports.postCountry = function(req,res){
  var NewCountry = new CountryModel({
      name: req.body.name,
      image: req.body.image,
      flag: req.body.flag,
      description: req.body.description,
      territory: req.body.territory,
      map: req.body.map,
      capital: req.body.capital,
      area: req.body.area,
      continent_key: req.body.continent_key,
      country_key: req.body.country_key
  });
  NewCountry.save(function(err) {
    if (err) {
      return res.json({ success: false, message: 'Error on create country.', Error: err });
    }
      return res.json({ success: true, message: 'Successfully created.' });
  });
};
exports.deleteCountry = function(req,res){
  CountryModel.findByIdAndRemove(req.params.id, (err, Country) => {  
    if (err) {
      return res.json({ success: false, message: 'Error!'});
    }
    if(Country){
      res.json({ success: true, message: 'Record successfully deleted.' });
    }else{
      res.json({ success: false, message: 'Record not exists.' }); 
    }
  });
};  

