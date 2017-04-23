// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var passport = require('passport'),
	mysql = require('./mysql.js');

var connection = mysql();

// Define the Passport configuration method
module.exports = function() {
    // Load the 'User' model
    //var User = mongoose.model('User');
    
    // Use Passport's 'serializeUser' method to serialize the user id
    passport.serializeUser(function(user, done) {

		done(null, user.user_id);
    });
    
    // Use Passport's 'deserializeUser' method to load the user document
    passport.deserializeUser(function(id, done) {
	   connection.query("select * from User where user_id = "+id,function(err,rows, fields){
        
        done(err, rows[0]); 
        });
    });
    
    // Load Passport's strategies configuration files
    require('./strategies/local.js')();
};
