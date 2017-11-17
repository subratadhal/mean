var ContinentModel = require('../models/continent');
var bodyParser = require('body-parser');

exports.getContinent = function(req,res){
  ContinentModel.find(function(err,Continent){
    if(err){
      res.json(err);
    }
    else{
      res.json(Continent);
    }
  });
};

exports.getSingleContinent = function(req,res){
  ContinentModel.findById(req.params.id, function(err, Continent) {
      if (err) {
        return res.json({ success: false, message: 'Record not exists', Error: err });
      }
      if (Continent) {
        res.json(Continent);
      } else {
        return res.json({ success: false, message: 'Record not exists'});
      }
  });
};

exports.editContinent = function(req,res){
  
  var id1 = req.params.id; console.log(id1);
  ContinentModel.findById(id1, function(err, doc) {
    if (err) {
        return res.json({ success: false, message: 'Record not exists', Error: err  });
      }
      if (doc) {
         if(doc._id == id1){
          
          var data = {
                name: req.body.name == undefined ?  doc.name : req.body.name,
                image: req.body.image == undefined ?  doc.image : req.body.image,
                description: req.body.description == undefined ?  doc.description : req.body.description,
                area: req.body.area == undefined ?  doc.area : req.body.area,
                country_count: req.body.country_count == undefined ?  doc.country_count : req.body.country_count,
                continent_key: req.body.continent_key == undefined ?  doc.continent_key : req.body.continent_key
                }; 

             ContinentModel.findByIdAndUpdate(id1, data, function(err, Continent) {
                if (err) {
                  return res.json({ success: false, message: 'Record not Update.' });
                }
                if (Continent) {
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

exports.deleteContinent = function(req,res){
  ContinentModel.findByIdAndRemove(req.params.id, (err, Continent) => {  
    if (err) {
      return res.json({ success: false, message: 'Error!'});
    }
    if(Continent){
      res.json({ success: true, message: 'Record successfully deleted.' });
    }else{
      res.json({ success: false, message: 'Record not exists.' }); 
    }
  });
};  

exports.postContinent = function(req,res){
  var NewContinent = new ContinentModel({
      name: req.body.name,
      image: req.body.image,
      description: req.body.description,
      area: req.body.area,
      continent_key: req.body.continent_key,
      country_count: req.body.country_count
  });
   NewContinent.save(function(err) {
       if (err) {
         return res.json({ success: false, message: 'Record not exists', Error: err });
       }
         return res.json({ success: true, message: 'Successfully created.' });
      });
};
