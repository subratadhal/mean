var jwt = require('jsonwebtoken');
var UserModel = require('../models/user');
var config = require('../../config/main');
//var User=new UserModel();

//Authenticate with Passport
exports.getAuthenticate = function(req,res){  
      UserModel
        .findOne({ email: req.body.email })
        .exec(function (err, user) {
              console.log(req.body);
              if (!user) {
              res.send({ success: false, message: 'Authentication failed. User not found.' });
            } else {
              console.log(req.body.password);
              // Check if password matches
              user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) { 
                  // Create token if the password matched and no error was thrown
                  var token = jwt.sign({user}, config.secret, { expiresIn: '10h' });
                  return res.json({ success: true, user: user, token: 'JWT ' + token });
                } else {
                  res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
                }
              });
            }
        });
};

// User Registration and fetch user
exports.register = function(req,res){
    if(!req.body.email || !req.body.password) {
      res.json({ success: false, message: 'Please enter email and password.' });
    } else {
      var newUser = new UserModel({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      });
      // Attempt to save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({ success: false, message: 'That email address already exists.'});
        }
        res.json({ success: true, message: 'Successfully created new user.' });
      });
    }
};
exports.getUser = function(req,res){
  UserModel.find(function(err,result){
    if(err){
      res.json(err);
    }
    else{
      res.json(result);
    }
  });
};
exports.getSingleUser = function(req,res){
  var id1 = req.params.id;
  UserModel.findById(id1, function(err, users) {
    if (err) {
        return done(err, false);
      }
      if (users) {
        res.json(users);
      } else {
        res.json({ success: false, message: 'User details not found' });
      }
  });
};





