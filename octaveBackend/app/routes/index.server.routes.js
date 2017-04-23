// Invoke 'strict' JavaScript mode
'use strict';

var users = require("../controllers/users.server.controller");


// Define the routes module' method
module.exports = function(app) {
	// Load the 'index' controller
	var index = require('../controllers/index.server.controller');

	// Mount the 'index' controller's 'render' method
	app.get('/',  users.requiresLoginView, index.render);

};
