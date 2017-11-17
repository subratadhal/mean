var DistrictModel = require('../models/district');
var bodyParser = require('body-parser');

exports.getDistrict = function(req,res){
  DistrictModel.find(function(err,result){
    if(err){
      res.json(err);
    }
    else{
      res.json(result);
    }
  });
};

exports.getSingleDistrict = function(req,res){
  DistrictModel.findById(req.params.id, function(err, district) {
      if (err) {
        return res.json({ success: false, message: 'Record not exists', Error: err });
      }
      if (district) {
        res.json(district);
      } else {
        return res.json({ success: false, message: 'Record not exists'});
      }
  });
};

exports.editDistrict = function(req,res){
  var id1 = req.params.id; console.log(id1);
  DistrictModel.findById(id1, function(err, doc) {
    if (err) {
        return res.json({ success: false, message: 'Record not exists', Error: err  });
      }
      if (doc) {
         if(doc._id == id1){
          
          var data = {
                name: req.body.name == undefined ?  doc.name : req.body.name,
                area: req.body.area == undefined ?  doc.area : req.body.area,
                image: req.body.image == undefined ?  doc.image : req.body.image,
                district_count: req.body.district_count == undefined ?  doc.district_count : req.body.district_count,
                description: req.body.description == undefined ?  doc.description : req.body.description,
                headquarters: req.body.headquarters == undefined ?  doc.headquarters : req.body.headquarters,
                density: req.body.density == undefined ?  doc.density : req.body.density,
                sex_ratio: req.body.sex_ratio == undefined ?  doc.sex_ratio : req.body.sex_ratio,
                languages: req.body.languages == undefined ?  doc.languages : req.body.languages,
                map: req.body.map == undefined ?  doc.map : req.body.map,
                latitude: req.body.latitude == undefined ?  doc.latitude : req.body.latitude,
                longitude: req.body.longitude == undefined ?  doc.longitude : req.body.longitude,
                continent_key: req.body.continent_key == undefined ?  doc.continent_key : req.body.continent_key,
                country_key: req.body.country_key == undefined ?  doc.country_key : req.body.country_key,
                state_key:req.body.state_key == undefined ?  doc.state_key : req.body.state_key,
                district_key: req.body.district_key == undefined ?  doc.district_key : req.body.district_key
                }; 

            DistrictModel.findByIdAndUpdate(id1, data, function(err, district) {
                if (err) {
                  return res.json({ success: false, message: 'Record not Update.' });
                }
                if (district) {
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
exports.postDistrict = function(req,res){
  var NewDistrict = new DistrictModel({
      name: req.body.name,
      image: req.body.image,
      headquarters: req.body.headquarters,
      description: req.body.description,
      area: req.body.area,
      density: req.body.density,
      sex_ratio: req.body.sex_ratio,
      languages: req.body.languages,
      map: req.body.map,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      continent_key: req.body.continent_key,
      country_key: req.body.country_key,
      state_key:req.body.state_key,
      district_key: req.body.district_key
  });
  NewDistrict.save(function(err) {
    if (err) {
      return res.json({ success: false, message: 'Error on create district.', Error: err });
    }
      return res.json({ success: true, message: 'Successfully created.' });
  });
};
exports.deleteDistrict = function(req,res){
  DistrictModel.findByIdAndRemove(req.params.id, (err, district) => {  
    if (err) {
      return res.json({ success: false, message: 'Error!'});
    }
    if(district){
      res.json({ success: true, message: 'Record successfully deleted.' });
    }else{
      res.json({ success: false, message: 'Record not exists.' }); 
    }
  });
};  

