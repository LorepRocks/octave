var mysql = require('../../config/mysql.js');
var connection = mysql();
var moment = require('moment');
var dateEntryFormat;
var dateEntry;

var activeRegistryQuery = "INSERT INTO Activo(nombre,descripcion) values (?,?)";
var getRiskCriteriaQuery = "SELECT id, nombre as name FROM criterio_riesgo";
var getimpactAreaQuery = "SELECT id, nombre as name FROM area_impacto ";
var saveImpactAreaQuery = "INSERT INTO area_impacto(nombre) values (?)";
var saveRiskCriteriaQuery = "INSERT INTO criterios_riesgo_seleccionado(criterio_riesgo_id,area_impacto_id,bajo,moderado,alto) values (?,?,?,?,?)"
var getActivesQuery = "Select id, nombre as name from activo";

var getActivesExcludeContainerQuery = "SELECT id, nombre as name from activo where id NOT IN (SELECT activo_id from activo_contenedor WHERE contenedor_id = ?)";

var saveCriticalActiveQuery = "INSERT INTO activo_critico(activo_id,justificacion,descripcion,propietarios,confidencialidad,integridad,requisitos_importantes,disponibilidad) VALUES (?,?,?,?,?,?,?,?)"
var saveContainerQuery = "INSERT INTO contenedor(nombre,descripcion_interno,propietario_interno,descripcion_externo,propietario_externo,type_container) VALUES (?,?,?,?,?,?)"

var getContainerByTypeQuery = "SELECT id,nombre,descripcion_interno,propietario_interno,descripcion_externo,propietario_externo,type_container FROM contenedor where type_container = ?"

var saveActiveContainerQuery = "INSERT INTO activo_contenedor(activo_id,contenedor_id) VALUES (?,?)";

exports.activeRegistry = function(req, res) {
    connection.query(activeRegistryQuery, [req.body.name, req.body.description], function(err, rows, fields) {
        if (err) {
            return res.status(400).send({
                message: "Ocurrio un error al insertar el activo " + err
            });
        } else {
            return res.status(200).send({
                message: "Activo registrado correctamente"
            });
        }
    });
};

exports.getRiskCriteria = function(req, res) {
    connection.query(getRiskCriteriaQuery, function(err, rows, fields) {
        if (err) {
            return res.status(400).send({
                message: "Ocurrio un error al consultar los criterios de riesgo " + err
            });
        } else {
            res.json(rows);
        }
    });
};

exports.getimpactArea = function(req, res) {
    connection.query(getimpactAreaQuery, function(err, rows, fields) {
        if (err) {
            return res.status(400).send({
                message: "Ocurrio un error al consultar las áreas de Impacto " + err
            });
        } else {
            res.json(rows);
        }
    });
};

exports.saveImpactArea = function(req, res) {
    connection.query(saveImpactAreaQuery, [req.body.name], function(err, rows, fields) {
        if (err) {
            return res.status(400).send({
                message: "Ocurrio un error al guardar el área de Impacto " + err
            });
        } else {
            return res.status(200).send({
                message: "Area de Impacto registrada correctamente"
            });
        }
    });
};

exports.saveRiskCriteria = function(req, res) {
    connection.query(saveRiskCriteriaQuery, [req.body.criteria.id, req.body.area.id, req.body.bajo, req.body.moderado, req.body.alto], function(err, rows, fields) {
        if (err) {
            return res.status(400).send({
                message: "Ocurrio un error al guardar el Criterio de Medida de Riesgo " + err
            });
        } else {
            return res.status(200).send({
                message: "Criterio de Medida de Riesgo registrado correctamente"
            });
        }
    });
}

exports.getActives = function(req, res) {
    connection.query(getActivesQuery, function(err, rows, fields) {
        if (err) {
            return res.status(400).send({
                message: "Ocurrio un error al consultar las áreas de Impacto " + err
            });
        } else {
            res.json(rows);
        }
    });
}

exports.saveCriticalActive = function(req, res) {
    connection.query(saveCriticalActiveQuery, [req.body.active.id, req.body.justification, req.body.description, req.body.owners, req.body.confidentiality, req.body.integrity, req.body.requirements, req.body.availability], function(err, rows, fields) {
        if (err) {
            return res.status(400).send({
                message: "Ocurrio un error al guardar el activo crítico " + err
            });
        } else {
            return res.status(200).send({
                message: "Activo crítico registrado correctamente"
            });
        }
    });
}

exports.saveContainer = function(req, res) {
    console.log(req.body);
    connection.query(saveContainerQuery, [req.body.name, req.body.internalDescription, req.body.internalOwner, req.body.externalDescription, req.body.externalOwner, req.body.containerType], function(err, rows, fields) {
        if (err) {
            return res.status(400).send({
                message: "Ocurrio un error al crear el contenedor " + err
            });
        } else {
            return res.status(200).send({
                message: "Contenedor registrado correctamente"
            });
        }
    });
}

exports.getContainerByType = function(req, res) {
    connection.query(getContainerByTypeQuery, [req.body.typeId], function(err, rows, fields) {
        if (err) {
            return res.status(400).send({
                message: "Ocurrio un error al consultar los contenedores " + err
            });
        } else {
            res.json(rows);
        }
    });
}

exports.saveActiveContainer = function(req, res) {
    var promises = [];
    console.log("active length",req.body.active.length);
    var saveActivePromise = function(response, reject) {
      console.log("entró");
        connection.query(saveActiveContainerQuery, [req.body.active[i].id, req.body.container.id], function(err, rows, fields) {
            if (err) {
                reject("Ocurrio un error al Asociar el activo al Contendedor" + err);
            } else {
                response("Activo Asociado al contenedor correctamente");
            }
        });
    }
    for (var i = 0; i < req.body.active.length; i++) {
        promises.push(new Promise(saveActivePromise));
    }
    Promise.all(promises).then(function(response) {
       console.log("response promise",response[0]);
        return  res.status(200).send({
            message: "Activo Asociado al contenedor correctamente"
        });
        //callback(null, response);
    }, function(reason) {
        callback(reason, null);
    })

};

exports.getActivesExcludeContainer = function(req,res){
  connection.query(getActivesExcludeContainerQuery,[req.body.containerId], function(err, rows, fields) {
      if (err) {
          return res.status(400).send({
              message: "Ocurrio un error al consultar las áreas de Impacto " + err
          });
      } else {
          res.json(rows);
      }
  });
}
