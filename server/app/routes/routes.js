var mongoose=require('mongoose');
var countryoperation=require('../controller/country.controller');
var useroperation=require('../controller/user.controller'); 
var continentoperation =require('../controller/continent.controller'); 
var districtoperation =require('../controller/district.controller'); 
var stateoperation =require('../controller/state.controller'); 
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
mongoose.Promise = require('bluebird');

var jwt = require('jsonwebtoken');
var UserModel = require('../models/user');
var config = require('../../config/main');

app.use(passport.initialize());
require('../../config/passport')(passport);

//app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = function(app){

	//Home routs redirect to dashboard
	app.get('/', passport.authenticate('jwt', { session: false }), function(req, res){
	  res.send({ success: true, message: 'Home route' });
	});
   
	// User Registration and fetch user
	app.route('/register').post(useroperation.register);
	app.route('/authenticate').post(useroperation.getAuthenticate);
	app.route('/user').get(passport.authenticate('jwt', { session: false }), useroperation.getUser);
	app.route('/user/:id').get(passport.authenticate('jwt', { session: false }), useroperation.getSingleUser);
	
	app.route('/continent').post(passport.authenticate('jwt', { session: false }), continentoperation.postContinent);
	app.route('/continent').get(passport.authenticate('jwt', { session: false }), continentoperation.getContinent);
	app.route('/continent/:id').get(passport.authenticate('jwt', { session: false }), continentoperation.getSingleContinent);
	app.route('/continent/:id').put(passport.authenticate('jwt', { session: false }), continentoperation.editContinent);
	app.route('/continent/:id').delete(passport.authenticate('jwt', { session: false }), continentoperation.deleteContinent);

	app.route('/country').post(passport.authenticate('jwt', { session: false }), countryoperation.postCountry);
	app.route('/country').get(passport.authenticate('jwt', { session: false }), countryoperation.getCountry);
	app.route('/country/:id').get(passport.authenticate('jwt', { session: false }), countryoperation.getSingleCountry);
	app.route('/country/:id').put(passport.authenticate('jwt', { session: false }), countryoperation.editCountry);
	app.route('/country/:id').delete(passport.authenticate('jwt', { session: false }), countryoperation.deleteCountry);

	app.route('/state').post(passport.authenticate('jwt', { session: false }), stateoperation.postState);
	app.route('/state').get(passport.authenticate('jwt', { session: false }), stateoperation.getState);
	app.route('/state/:id').get(passport.authenticate('jwt', { session: false }), stateoperation.getSingleState);
	app.route('/state/:id').put(passport.authenticate('jwt', { session: false }), stateoperation.editState);
	app.route('/state/:id').delete(passport.authenticate('jwt', { session: false }), stateoperation.deleteState);

	app.route('/district').post(passport.authenticate('jwt', { session: false }), districtoperation.postDistrict);
	app.route('/district').get(passport.authenticate('jwt', { session: false }), districtoperation.getDistrict);
	app.route('/district/:id').get(passport.authenticate('jwt', { session: false }), districtoperation.getSingleDistrict);
	app.route('/district/:id').put(passport.authenticate('jwt', { session: false }), districtoperation.editDistrict);
	app.route('/district/:id').delete(passport.authenticate('jwt', { session: false }), districtoperation.deleteDistrict);
	
	// Handle 400
	app.use(function(req, res) {
	  res.status(400);
	  res.send({ success: false, message: '404: File Not Found.' });
	});
	  
	// Handle 500
	app.use(function(error, req, res, next) {
	  res.status(500);
	  res.send({ success: false, message: '500: Internal Server Error.',error: error });
	});
}