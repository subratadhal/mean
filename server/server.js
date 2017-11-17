var express = require('express');
var cors = require('cors');
app = express();
app.use(cors());
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var config = require('./config/main');

var flash = require('express-flash');
var session = require('express-session');

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

// var multer  = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// var upload = multer({ storage: storage });

var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
mongoose.Promise = require('bluebird');
//schemeas
// var User = require('./app/models/user');
// var Country = require('./app/models/country');

var port = 3000;
//app.use(bodyParser.urlencoded({extended : false}));
//app.use(bodyParser.json());

app.use(morgan('dev')); 
//app.use(fileUpload({safeFileNames: /\\/g, preserveExtension: true}));

mongoose.connect(config.database);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var routes=require('./app/routes/routes');
routes(app);

app.listen(port);
console.log('Your server is running on port ' + port + '.');