// Invoke 'strict' JavaScript mode
'use strict';

var moment = require('moment');



// Create a new 'render' controller method
exports.render = function(req, res, tittle) {

	var home = "/home";
	//console.log(req);

	
		res.render('index', {
			title: 'test',
			userJSON: req.user,
			user: JSON.stringify(req.user),
			moment: moment
		});
	}


