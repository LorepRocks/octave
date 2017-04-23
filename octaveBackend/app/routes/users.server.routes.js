var users = require('../../app/controllers/users.server.controller.js'), 
    passport = require('passport');


module.exports = function (app) {
    app.route('/login')
	.get(users.renderSignin)
	.post(passport.authenticate('local', {
	    successRedirect: '/', 
	    failureRedirect: '/login',
	    failureFlash: true
	}), 
		function(req,res){
			console.log(req.user);
		}
	);

	app.route('/resetPassword')
	.post(users.resetPassword);

	app.route('/api/changePassword/:userId')
	.put(users.changePassword);


    app.get('/logout', users.signout);

};



