// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	mysql = require('../mysql.js'),
	crypto = require('crypto');

var connection = mysql();
/*var connection = mysql.createConnection({
      host     : '192.168.4.51',
      user     : 'root',
      password : 'kh27mr19fz',
      database : 'babybook'
    });

connection.connect();*/

// Create the Local strategy configuration method

module.exports = function() {
    // Use the Passport's Local strategy 
    passport.use(new LocalStrategy(function(username, password, done) {
		// Use the 'User' model 'findOne' method to find a user with the current username
		var salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		var crypass = crypto.pbkdf2Sync(password, salt.toString('base64'), 10000, 64).toString('base64');

		 connection.query("select * from User where username = '"+username+"' and password = '"+password+"'",function(err,rows,fields){
		 		if (err)
					return done(err);
				if (!rows.length) {
					console.log('loginMessage No user found.');
					return done(null, false, {
					message: 'Invalid username or password'
				});
				}
				// if the user is found but the password is wrong
	
				
				
				return done(null, rows[0]); 
				
    });
}));
}
