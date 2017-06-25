var mysql = require('../../config/mysql.js');
var connection = mysql();
var moment = require('moment');
var nodemailer = require('nodemailer');
var emailTemplates = require('email-templates');
var smtptransport = require('nodemailer-smtp-transport');
var dateEntryFormat;
var dateEntry;
var path = require('path');
var templatesDir   = path.resolve(__dirname + '../../views/templates');

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'lorenajrc@gmail.com',
        pass: 'Je2i28my90.22'
    }
});

var getuserQuery = "SELECT id,name,lastname,username,profile from user where username = ? and password = ?";
var getUsersQuery = "SELECT id,name,lastname,case profile when 1 then 'Administrador' when 2 then 'Consulta' end as profile, profile as profileId, username from user where is_archived = 0 order by id desc";
var saveUserQuery = "INSERT INTO user(name,lastname,username,password,profile) VALUES (?,?,?,?,?)";
var updateUserQuery = "UPDATE user set name = ?, lastname = ?, username = ?, profile = ? where id = ?";
var updatePasswordQuery = "Update user set password = ? where id = ?";
var deleteUserQuery = "Update user set is_archived = 1 where id = ?";
var activeSesionQuery = "UPDATE user set sessionActive = 1 where id = ?";
var getSessionActiveQuery = "select id,name,lastname,username,profile from user where sessionActive = 1 ";
var logoutQuery = "UPDATE user set sessionActive = 0 where id = ?";


exports.getUser = function(req, res) {
  connection.query(getuserQuery, [req.body.user.username, req.body.user.password],function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al consultar el usuario " + err
      });
    } else {
      console.log("rows user",rows);
      if (rows.length === 0) {
        return res.status(200).send({
          message: "Usuario y/o Contraseña Incorrecto"
        });
      } else {
        res.json(rows);
      }

    }
  });
}

exports.getUsers = function(req,res){
  connection.query(getUsersQuery,function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al consultar los usuarios" + err
      });
    } else{
        res.json(rows);
    }
  });
}

exports.saveUser = function(req,res){
  connection.query(saveUserQuery,[req.body.user.name,req.body.user.lastname,req.body.user.username,req.body.user.password,req.body.user.profile],function(err, rows, fields) {
    if (err) {
      return res.status(200).send({
        message: "Error creando Usuario" + err
      });
    } else{
      return res.status(200).send({
        message: "Usuario creado correctamente"
      });
    }
  });
}

exports.updateUser = function(req,res){
  connection.query(updateUserQuery,[req.body.user.name,req.body.user.lastname,req.body.user.username,req.body.user.profile,req.body.user.id],function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al actualizar los usuarios" + err
      });
    } else{
      return res.status(200).send({
        message: "Usuario actualizado correctamente"
      });
    }
  });
}

exports.updatePasswordUser = function(req,res){
  connection.query(updatePasswordQuery,[req.body.user.password,req.body.user.id],function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al actualizar los usuarios" + err
      });
    } else{
      return res.status(200).send({
        message: "Contraseña generada correctamente"
      });
    }
  });
}

exports.deleteUser = function(req,res){
  connection.query(deleteUserQuery,[req.body.id],function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al eliminar los usuarios" + err
      });
    } else{
      return res.status(200).send({
        message: "Usuario Eliminado correctamente"
      });
    }
  });
}

exports.sessionActive = function(req,res){
  connection.query(activeSesionQuery,[req.body.id],function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al eliminar los usuarios" + err
      });
    } else{
      return res.status(200).send({
        message: "Sessión iniciada!!"
      });
    }
  });
}
exports.getSessionActive = function(req,res){
  connection.query(getSessionActiveQuery, function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al consultar el usuario " + err
      });
    } else {
      console.log("rows user",rows);
      if (rows.length === 0) {
        return res.status(200).send({
          message: "no hay usuario con session activa"
        });
      } else {
        res.json(rows);
      }

    }
  });
}
exports.logout = function(req,res){
  connection.query(logoutQuery,[req.body.id],function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al eliminar los usuarios" + err
      });
    } else{
      return res.status(200).send({
        message: "Session Cerrada"
      });
    }
  });
}

exports.sendMailNewUser = function(req, res){
	try{
		var to = req.body.user.username;
		var subject = "Bienvenido a Octave Allegro APP";
		var title = "Bienvenido "+req.body.user.name+" "+req.body.user.lastname+"!";
		var message = "<p>Se ha realizado el registro de cuenta en Octave Allegro APP";
			message +="<br/>Tu usuario es: "+req.body.user.username;
			message +="<br/>Tu contraseña es: <strong>"+req.body.user.password+"</strong></p>";

		sendMail(to,subject,title,message);

	}catch(err){
		console.log(err);
	}
}

function sendMail(addressList,subject,title,message){

	var to = "";
	if( typeof addressList == "object" ){
		addressList.forEach(function(address){
			to += '<'+address+'>,';
		});
		to = to.substring(0, to.length - 1);
	}else{
		to = "<"+addressList+">";
	}

	console.log("Enviando correo a: ",to);

	var locals = {
		email: to,
		titulo:title,
		mensaje: message
	};


  //  var transport = nodemailer.createTransport("SMTP", {
  //       host: "email-smtp.us-east-1.amazonaws.com", // hostname
  //       secureConnection: true, // use SSL
  //       port: 465, // port for secure SMTP
  //       secure: true,
  //       auth: {
  //           user: "AKIAJDZIE4AUCLWYNITQ",
  //           pass: "AsJBoKkiDgHcVP+JYoi4BFRsgQ3W4zQUOzhNjr8+aIim"
  //       }
  //   });

   var transport = nodemailer.createTransport("SMTP", {
        host: "smtp.gmail.com", // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        secure: true,
        auth: {
            user: "lorenajrc@gmail.com",
            pass: "Je2i28my90.22"
        }
    });

	emailTemplates(templatesDir, function(err, template) {
		if(err){
			return res.status(401).send({
				message: "ERROR: Cargando emailTemplates "+err
			});
		}else{
			template('contact', locals, function(err, html, text) {
            	if (err) {
					throw "ERROR: Cargando emailTemplates "+err
               }else{
					transport.sendMail({
						from: '<noreply@octave.com>',
						to: locals.email,
						subject: subject,
						html: html
					}, function(err, responseStatus) {
						if (err) {
                        	console.log(err);
                         	throw "ERROR: Enviando mail "+err
                   		}
                 	});
        		}
	      	});
    	}
	});
}
