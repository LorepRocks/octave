// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var	config = require('./config');
var mysql = require('mysql');


module.exports = function() {
    

var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'kh27mr19fz',
      database : 'octave'
    });

connection.connect();

    
    return connection;
};
