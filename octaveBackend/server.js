// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'NODE_ENV' variable
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies

var express = require('./config/express'),
	passport = require('./config/passport'),
	mysql = require('./config/mysql');

// Create a new Mongoose connection instance


// Create a new Express application instance
var app = express();

// Configure the Passport middleware
var passport = passport();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Use the Express application instance to listen to the '3010' port
app.listen(3040);

// Log the server status to the console
console.log('Octave Backend Running http://localhost:3040/');

// Use the module.exports property to expose our Express application instance for external usage
module.exports = app;
