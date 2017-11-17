var JwtStrategy = require('passport-jwt').Strategy;  
var ExtractJwt = require('passport-jwt').ExtractJwt;  
var User = require('../app/models/user');  
var config = require('../config/main');

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {  
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');// ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done){ 
    console.log(jwt_payload.user._id);
    var id1 = jwt_payload.user._id;
     User.findById(id1, function(err, users) {
      if (err) {
        return done(err, false);
      }
      if (users) {
        console.log('if users');
        console.log(users);
        done(null, users);
      } else {
        console.log('else user');
        console.log(users);
        done(null, false);
      }
    });
  }));
};