var mysql = require('../../config/mysql.js');
var connection = mysql();
var moment = require('moment');
var dateEntryFormat;
var dateEntry;

var getuserQuery = "SELECT name,lastname,profile from user where username = ? and password = ?";


exports.getUser = function(req, res) {
  connection.query(getuserQuery, [req.body.user.username, req.body.user.password],function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al consultar los criterios de riesgo " + err
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
