var StateModel = require('../models/state');
var bodyParser = require('body-parser');

exports.getState = function(req,res){
  StateModel.find(function(err,result){
    if(err){
      res.json(err);
    }
    else{
      res.json(result);
    }
  });
};

exports.getSingleState = function(req,res){
  StateModel.findById(req.params.id, function(err, state) {
      if (err) {
        return res.json({ success: false, message: 'Record not exists', Error: err });
      }
      if (state) {
        res.json(state);
      } else {
        return res.json({ success: false, message: 'Record not exists'});
      }
  });
};

exports.editState = function(req,res){
  var id1 = req.params.id; console.log(id1);
  StateModel.findById(id1, function(err, doc) {
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
                state_count: req.body.state_count == undefined ?  doc.state_count : req.body.state_count,
                description: req.body.description == undefined ?  doc.description : req.body.description,
                density: req.body.density == undefined ?  doc.density : req.body.density,
                sex_ratio: req.body.sex_ratio == undefined ?  doc.sex_ratio : req.body.sex_ratio,
                languages: req.body.languages == undefined ?  doc.languages : req.body.languages,
                map: req.body.map == undefined ?  doc.map : req.body.map,
                latitude: req.body.latitude == undefined ?  doc.latitude : req.body.latitude,
                longitude: req.body.longitude == undefined ?  doc.longitude : req.body.longitude,
                continent_key: req.body.continent_key == undefined ?  doc.continent_key : req.body.continent_key,
                country_key: req.body.country_key == undefined ?  doc.country_key : req.body.country_key,
                state_key: req.body.state_key == undefined ?  doc.state_key : req.body.state_key,
                }; 

             StateModel.findByIdAndUpdate(id1, data, function(err, State) {
                if (err) {
                  return res.json({ success: false, message: 'Record not Update.' });
                }
                if (State) {
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
exports.postState = function(req,res){
  var NewState = new StateModel({
      name: req.body.name,
      image: req.body.image,
      capital: req.body.capital,
      description: req.body.description,
      density: req.body.density,
      sex_ratio: req.body.sex_ratio,
      languages: req.body.languages,
      map: req.body.map,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      area: req.body.area,
      continent_key: req.body.continent_key,
      country_key: req.body.country_key,
      state_key: req.body.state_key
  });
  NewState.save(function(err) {
    if (err) {
      return res.json({ success: false, message: 'Error on create state.', Error: err });
    }
      return res.json({ success: true, message: 'Successfully created.' });
  });
};
exports.deleteState = function(req,res){
  StateModel.findByIdAndRemove(req.params.id, (err, State) => {  
    if (err) {
      return res.json({ success: false, message: 'Error!'});
    }
    if(State){
      res.json({ success: true, message: 'Record successfully deleted.' });
    }else{
      res.json({ success: false, message: 'Record not exists.' }); 
    }
  });
};