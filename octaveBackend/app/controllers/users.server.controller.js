'use strict';

var 
    crypto = require('crypto'), 
    passport = require('passport'),
    randomstring = require('just.randomstring'),
    nodemailer = require("nodemailer"),
    emailTemplates = require('email-templates'),
    path = require('path'),
    templatesDir   = path.resolve(__dirname + '../../views/templates'),
    smtptransport = require('nodemailer-smtp-transport'),
    mysql = require('../../config/mysql.js');
  var connection = mysql();
  

exports.renderSignin = function (req, res, next){
    if (!req.user){
      console.log("req",req.flash('error'));
		res.status(401).send({
      message: 'Usuario y/o contraseña invalidos' 
    });
    }else{
      console.log("Entro OK");
		res.status(200).send({
      message: '00' 
    });
    }
}

exports.signout = function(req, res){
    req.logout();

    res.redirect('/');
};


exports.requiresLogin = function (req, res, next){
    if (!req.isAuthenticated()){
		return res.status(401).send({
			message: 'User is not logged in'
		});
    }
    next();
}
exports.requiresLoginView = function (req, res, next) {
    if (!req.isAuthenticated()){
		return res.redirect('login');
    }
    next();
};


exports.resetPassword = function(req, res, next){

    var email  = req.param("username");
    console.log(email);
    
    if(email == ""){
        return res.end("El email no puede ser Vacio");
    }else{

          connection.query("Select * from User where email = '"+email+"'",function(err,rows,fields){
            if(err){
                 res.end("99");
            }else{
              console.log(rows[0]);
              var users = rows[0];
              var  password = randomstring(8,'numbers_uppercases_lowercases');
              if(users){
                       
                       
                       
                       var transport = nodemailer.createTransport("SMTP", {
                            host: "email-smtp.us-east-1.amazonaws.com", // hostname
                            secureConnection: true, // use SSL
                            port: 465, // port for secure SMTP
                            secure: true,
                            auth: {
                                user: "AKIAJDZIE4AUCLWYNITQ",
                                pass: "AsJBoKkiDgHcVP+JYoi4BFRsgQ3W4zQUOzhNjr8+aIim"
                            }
                        });

         
                        var locals = {
                          email: '<'+email+'>',
                          titulo:'Restablecimiento de Contraseña',
                          mensaje: 'Hemos recibido su solicitud de restablecimiento de contraseña. <br/> <br/> Su contraseña es: <b>'+password+'</b><br/><br/>Por favor intente ingresar nuevamente con esta contraseña.'
                        
                        };

                      emailTemplates(templatesDir, function(err, template) {

                           if (err) {
                                console.log(err);
                            } else {
                              template('contact', locals, function(err, html, text) {
                                if (err) {
                                    console.log(err);
                                } else {

                                    transport.sendMail({
                                        from: '<noreply@koghi.com>',
                                        to: locals.email,
                                        subject: 'Restablecimiento de Contraseña Weisheit',
                                        html: html
                                      
                                    }, function(err, responseStatus) {
                                      if (err) {
                                        console.log(err);
                                        res.end("99");
                                      } else {

                                        console.log(responseStatus.message);
                                        var salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
                                        var crypass = crypto.pbkdf2Sync(password, salt.toString('base64'), 10000, 64).toString('base64');
                                         connection.query("update User set password = '"+password+"' where user_id = "+users.user_id, function(err,rows,fields){
                                           if(err){
                                            return res.status(400).send({
                                            message: err
                                          });
                                          }else{
                                            res.end("00");
                                          }
                                        });
                                        res.end("00");
                                      }
                                    });
                               }
                              });
                            }
                      });
                  

               }else{
                  console.log("No hay resultados");
                  res.end("99");
               }
                    

            }
          
               
        });
     }
};

exports.changePassword = function (req, res){
	/*Se elimina el atributo __v para poder realizar el proceso de actualización*/
    delete req.body.__v;
	var user = new User (req.body);

	if (user.password && user.password.length > 0){

        // Use the model 'findById' method to find a single 
        User.findById(user._id).exec(function(err, user) {
            if (err) return err;
            if (!user) return new Error("Usuario No existe");
            
			if (user.authenticate(req.body.password) ){
				user.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
				user.password = crypto.pbkdf2Sync(req.body.newPassword, user.salt, 10000, 64).toString('base64');
					console.log("USER", user);

				User.update({_id: user._id}, {password: user.password, salt: user.salt},  function(err) {
					if (err) {	
						return res.status(400).send({
							message: err
						});
					}else{
						return res.status(200).send({
							message: "Contraseña cambiada correctamente"
						});
					}
				});	

			}else{
				return res.status(400).send({
					message: "Contraseña invalida"
				});
			}
		});
    }else{
		return res.status(200).send({
			message: "No se ha cambiado la contraseña"
		});
	}

}

