var mysql = require('../../config/mysql.js');
var connection = mysql();
var moment = require('moment');
var dateEntryFormat;
var dateEntry;

var activeRegistryQuery = "INSERT INTO Activo(nombre,descripcion) values (?,?)";
var getRiskCriteriaQuery = "select c.area_impacto_id, a.nombre as name, c.bajo, c.moderado, c.alto from criterios_riesgo_seleccionado c inner join area_impacto a on a.id = c.area_impacto_id";
var getimpactAreaQuery = "SELECT id, nombre as name, indice  FROM area_impacto order by indice ASC ";
var saveImpactAreaQuery = "INSERT INTO area_impacto(nombre,indice) values (?,0)";
var saveRiskCriteriaQuery = "INSERT INTO criterios_riesgo_seleccionado(area_impacto_id,bajo,moderado,alto) values (?,?,?,?)"

var updateRiskCriteriaQuery = "UPDATE criterios_riesgo_seleccionado set bajo = ?, moderado = ?, alto = ? where area_impacto_id = ?";

var deleteRiskCriteriaQuery = "DELETE FROM  criterios_riesgo_seleccionado where area_impacto_id = ?";
var getActivesQuery = "Select id, nombre as name, descripcion as description from activo where is_archived = 0 order by id desc";

var getActivesExcludeContainerQuery = "SELECT id, nombre as name from activo where id NOT IN (SELECT activo_id from activo_contenedor WHERE contenedor_id = ?)";

var getActivesInContainerQuery = "SELECT id, nombre as name from activo where id IN (SELECT activo_id from activo_contenedor WHERE contenedor_id = ?)"

var getCriticalActiveQuery = "SELECT ac.activo_id, a.nombre as name, ac.justificacion, ac.descripcion, ac.propietarios,ac.confidencialidad, ac.integridad, ac.requisitos_importantes,ac.disponibilidad FROM activo_critico ac INNER JOIN activo a on a.id = ac.activo_id where ac.is_archived = 0";

var updateCriticalActiveQuery = "UPDATE activo_critico set justificacion = ?, descripcion = ?, propietarios = ?, confidencialidad = ?, integridad = ?, requisitos_importantes = ?, disponibilidad = ? where activo_id = ?"

var deleteCriticalActiveQuery = "Update activo_critico set is_archived =  1 where activo_id = ?";

var saveCriticalActiveQuery = "INSERT INTO activo_critico(activo_id,justificacion,descripcion,propietarios,confidencialidad,integridad,requisitos_importantes,disponibilidad) VALUES (?,?,?,?,?,?,?,?)"
var saveContainerQuery = "INSERT INTO contenedor(nombre,descripcion_interno,propietario_interno,descripcion_externo,propietario_externo,type_container) VALUES (?,?,?,?,?,?)"

var getContainerByTypeQuery = "SELECT id,nombre,descripcion_interno,propietario_interno,descripcion_externo,propietario_externo,type_container FROM contenedor where type_container = ?"

var getContainersQuery = "SELECT id,nombre as name,descripcion_interno,propietario_interno,descripcion_externo,propietario_externo,case  type_container when 1 then 'Contenedor Técnico' when 2 then 'Contenedor Físico' when 3 then 'Contenedor Personas' END as name_type_container, type_container FROM contenedor where is_archived = 0 order by id desc";

var updateContainerQuery = "UPDATE contenedor SET nombre = ?, descripcion_interno= ?, propietario_interno = ?, descripcion_externo = ?, propietario_externo = ? , type_container = ? WHERE id = ? "

var deleteContainerQuery = "UPDATE contenedor set is_archived = 1 where id = ?";

var saveActiveContainerQuery = "INSERT INTO activo_contenedor(activo_id,contenedor_id) VALUES (?,?)";

var deleteActivesContainerQuery = "DELETE FROM activo_contenedor where contenedor_id = ?";

var updateIndiceImpactAreaQuery = "Update area_impacto set indice = ? where id = ?"

var saveConcernAreaQuery = "INSERT INTO area_preocupacion(activo_critico_id,nombre,actor,medio,motivo,requisitos_seguridad,resultado,probabilidad,accion) VALUES (?,?,?,?,?,?,?,?,?)";

var getAreaImpactoByOrderQuery = "select id, nombre, case indice when 0 then 5 when 1 then 4 when 2 then 3 when 3 then 2 when 4 then 1 end as indice from area_impacto";

var saveConsequencesQuery = "INSERT INTO consecuencias(nombre,descripcion,area_impacto_id,valor_impacto,puntaje) VALUES(?,?,?,?,?)";

var saveConsequenceAreaQuery = "INSERT INTO area_consecuencias(area_preocupacion_id,consecuencia_id) VALUES (?,?)";

var getRelativeRiskQuery = "select ap.id, ap.nombre as name, sum(c.puntaje) as score, CASE ap.probabilidad when 3 then 'Bajo' when 2 then 'Medio' when 1 then 'Alto' END as probability from consecuencias c inner join area_consecuencias ac on c.id = ac.consecuencia_id inner join area_preocupacion ap on ac.area_preocupacion_id = ap.id group by ap.id";

var getActionQuery = "select ap.id, ap.nombre as name, sum(c.puntaje) as score, " +
  "Case ap.probabilidad when 3 then 'Bajo' when 2 then 'Medio' when 1 then 'Alto' END as subjetiva, " +
  "CASE " +
  "when ap.probabilidad = 3 and sum(c.puntaje) between 0 and 15 then 'Grupo 4' " +
  "when ap.probabilidad  = 3 and sum(c.puntaje) between 16 and 29 then 'Grupo 3' " +
  "when ap.probabilidad  = 3 and sum(c.puntaje) between 30 and 45 then 'Grupo 3' " +
  "when ap.probabilidad  = 2 and sum(c.puntaje) between 0 and 15 then 'Grupo 3' " +
  "when ap.probabilidad = 2 and sum(c.puntaje) between 16 and 29 then 'Grupo 2' " +
  "when ap.probabilidad  = 2 and sum(c.puntaje) between 30 and 45 then 'Grupo 2' " +
  "when ap.probabilidad  = 1 and sum(c.puntaje) between 0 and 15 then 'Grupo 2' " +
  "when ap.probabilidad  = 1 and sum(c.puntaje) between 16 and 29 then 'Grupo 2' " +
  "when ap.probabilidad  = 1 and sum(c.puntaje) between 30 and 45 then 'Grupo 1' " +
  "END as grupo, " +
  "CASE " +
  "when ap.probabilidad = 3 and sum(c.puntaje) between 0 and 15 then 'Aceptar' " +
  "when ap.probabilidad  = 3 and sum(c.puntaje) between 16 and 29 then 'Transferir o Aceptar' " +
  "when ap.probabilidad  = 3 and sum(c.puntaje) between 30 and 45 then 'Transferir o Aceptar' " +
  "when ap.probabilidad  = 2 and sum(c.puntaje) between 0 and 15 then 'Transferir o aceptar' " +
  "when ap.probabilidad = 2 and sum(c.puntaje) between 16 and 29 then 'Mitigar o Transferir' " +
  "when ap.probabilidad  = 2 and sum(c.puntaje) between 30 and 45 then 'Mitigar o Transferir' " +
  "when ap.probabilidad  = 1 and sum(c.puntaje) between 0 and 15 then 'Transferir o Aceptar' " +
  "when ap.probabilidad  = 1 and sum(c.puntaje) between 16 and 29 then 'Mitigar o Transferir' " +
  "when ap.probabilidad  = 1 and sum(c.puntaje) between 30 and 45 then 'Mitigar' " +
  "END " +
  "as accion " +
  "from consecuencias c " +
  "inner join area_consecuencias ac on c.id = ac.consecuencia_id " +
  "inner join area_preocupacion ap on ac.area_preocupacion_id = ap.id " +
  "group by ap.id";

var getControlsQuery = "SELECT id,control from controles WHERE area_preocupacion_id = ?";

var saveControlQuery = "INSERT INTO controles(area_preocupacion_id,control) VALUES (?,?)";

var updateControlQuery = "UPDATE controles SET control = ? where id = ?";

var deleteControlQuery = "DELETE FROM controles where id = ?";

var updateActiveQuery = "UPDATE activo set nombre = ?, descripcion = ? where id = ?";

var deleteActiveQuery = "UPDATE activo set is_archived = 1 where id = ?";

var getConcernAreasQuery = "SELECT id, activo_critico_id,nombre as name, actor,medio, motivo,requisitos_seguridad, resultado, probabilidad, accion from area_preocupacion where is_archived = 0 order by id desc";

var getConcernAreasPDFQuery = "SELECT id, activo_critico_id,nombre as name, actor,medio, motivo,requisitos_seguridad, case resultado when 1 then 'Divulgacion' when 2 then 'Modificación' when 3 then 'Destrucción' when 4 then 'Interrupción' end as resultado, case probabilidad when 1 then 'Alto' when 2 then 'Medio' when 3 then 'Bajo' end as probabilidad,case accion when 1 then 'Aceptar' when 2 then 'Aplazar' when 3 then 'Mitigar' when 4 then 'Transferir' end as accion from area_preocupacion where is_archived = 0 order by id desc";

var getConsequencesQuery = "select id,nombre as name,descripcion as description,area_impacto_id as area,valor_impacto as impactValue from consecuencias where id in (select consecuencia_id from area_consecuencias where area_preocupacion_id = ?)";

var getConsequencesPDFQuery = " select c.id,c.descripcion as description,c.area_impacto_id as area_id,a.nombre as area_name,case valor_impacto when 3 then 'Alto' when 2 then 'Medio' when 1 then 'Bajo' end as impactValue, c.puntaje from consecuencias c inner join area_impacto a on c.area_impacto_id = a.id where c.id in (select consecuencia_id from area_consecuencias where area_preocupacion_id = ?)";

var updateConcernAreaQuery = "UPDATE area_preocupacion set activo_critico_id = ?,nombre = ?,actor = ?,medio =?,motivo=?,requisitos_seguridad=?,resultado=?,probabilidad=?,accion=? where id = ?";

var deleteConsequencesAreaQuery = "DELETE FROM area_consecuencias where area_preocupacion_id = ?";

var deleteConcernAreaQuery = "Update area_preocupacion set is_archived = 1 where id = ?";


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
  console.log("getImpact");
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
  connection.query(saveRiskCriteriaQuery, [req.body.area.id, req.body.bajo, req.body.moderado, req.body.alto], function(err, rows, fields) {
    if (err) {
      var mensaje = "Ocurrio un error al guardar el Criterio de Medida de Riesgo " + err;
      if (err.code.includes("ER_DUP_ENTRY")) {
        mensaje = "Ya existe un críterio de Medida de Riesgo para la área seleccionada";
      }
      return res.status(400).send({
        message: mensaje
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
  console.log("active length", req.body.active.length);
  connection.query(deleteActivesContainerQuery, [req.body.container.id], function(err) {
    if (err) {
      callback(err, null);
    } else {
      console.log("Se borraron todos los activos asociados al contenedor");
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
        console.log("response promise", response[0]);
        return res.status(200).send({
          message: "Activo Asociado al contenedor correctamente"
        });
        //callback(null, response);
      }, function(reason) {
        callback(reason, null);
      });
    }
  });


};

exports.getActivesExcludeContainer = function(req, res) {
  connection.query(getActivesExcludeContainerQuery, [req.body.containerId], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al consultar los activos excluidos del container " + err
      });
    } else {
      res.json(rows);
    }
  });
};

exports.getActivesInContainer = function(req, res) {
  connection.query(getActivesInContainerQuery, [req.body.containerId], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al consultar los activos en el container " + err
      });
    } else {
      res.json(rows);
    }
  });
};

exports.getCriticalActive = function(req, res) {
  connection.query(getCriticalActiveQuery, function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al consultar los activos críticos " + err
      });
    } else {
      res.json(rows);
    }
  });
};


exports.updateIndiceImpactArea = function(req, res) {
  console.log("area", req.body.area);
  var promises = [];
  var updateIndicePromise = function(response, reject) {
    connection.query(updateIndiceImpactAreaQuery, [i, req.body.area[i].id], function(err, rows, fields) {
      if (err) {
        reject("Ocurrio un error al actualizar la priorización de las áreas" + err);
      } else {
        response("Priorización Guardada Exitosamente");
      }
    });
  }

  console.log("req.body.area.length", req.body.area.length);
  for (var i = 0; i < req.body.area.length; i++) {
    promises.push(new Promise(updateIndicePromise));
  }

  Promise.all(promises).then(function(resp) {
    return res.status(200).send({
      message: "Priorización Guardada Exitosamente"
    });
  }, function(reason) {
    callback(reason, null);
  })
};

exports.saveConcernArea = function(req, res) {
  console.log("saveConcernArea", req.body);
  connection.query(saveConcernAreaQuery, [req.body.area.criticalActive.activo_id, req.body.area.concernArea, req.body.area.actor, req.body.area.medium, req.body.area.motive, req.body.area.requirements, req.body.area.result.id, req.body.area.probability.id, req.body.area.action.id], function(err, rows, fields) {
    if (err) {
      console.log("err", err);
      return res.status(400).send({
        message: "Ocurrio un error al consultar las áreas de Impacto " + err
      });
    } else {
      var idrow = rows.insertId;
      console.log("idrow", idrow);
      var promises = [];
      var areaOrderPromise = function(response, reject) {
        connection.query(getAreaImpactoByOrderQuery, function(err, areas, fields) {
          if (err) {
            reject(err);
          } else {
            response(areas);
          }
        });
      }
      promises.push(new Promise(areaOrderPromise));
      Promise.all(promises).then(function(areas) {
        var areasList = areas[0];
        console.log("areas", JSON.stringify(areasList));
        promises = [];
        var saveConsequencesPromise = function(response, reject) {
          console.log("areas.length", areasList.length);
          for (var j = 0; j < areasList.length; j++) {
            console.log("entró", areasList[j]);
            console.log("req.body.area.consequences[i].area.id", req.body.area.consequences[i].area.id);
            if (req.body.area.consequences[i].area.id === areasList[j].id) {

              req.body.area.consequences[i].score = req.body.area.consequences[i].impactValue * areasList[j].indice;
              console.log("req.body.area.consequences[i].score", req.body.area.consequences[i].score);
              break;
            }
          }
          connection.query(saveConsequencesQuery, [req.body.area.consequences[i].name, req.body.area.consequences[i].description, req.body.area.consequences[i].area.id, req.body.area.consequences[i].impactValue, req.body.area.consequences[i].score], function(err, rows, fields) {
            var idConsequence = rows.insertId;
            connection.query(saveConsequenceAreaQuery, [idrow, idConsequence], function(err, rows, fields) {
              response("Area de Preocupación Guardada Correctamente");
            });
          });
        }
        for (var i = 0; i < req.body.area.consequences.length; i++) {
          promises.push(new Promise(saveConsequencesPromise));
        }
        Promise.all(promises).then(function() {
          return res.status(200).send({
            message: "Documentación de Area de Preocupación Guardada Correctamente"
          });
        }, function(reason) {
          callback(reason, null);
        });
      }, function(reason) {
        connection.release();
        callback(reason, null);
      });
    }
  });
}

exports.getRelativeRisk = function(req, res) {
  connection.query(getRelativeRiskQuery, function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al consultar el riesgo relativo " + err
      });
    } else {
      res.json(rows);
    }
  });
}

exports.getAction = function(req, res) {
  connection.query(getActionQuery, function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al consultar las acctiones " + err
      });
    } else {
      res.json(rows);
    }
  });
}

exports.getControls = function(req, res) {
  connection.query(getControlsQuery, [req.body.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al consultar los controles " + err
      });
    } else {
      res.json(rows);
    }
  });
}

exports.saveControl = function(req, res) {
  connection.query(saveControlQuery, [req.body.control.areaId, req.body.control.control], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al guardar Control " + err
      });
    } else {
      return res.status(200).send({
        message: "Control registrado correctamente"
      });
    }
  });
}

exports.updateControl = function(req, res) {
  connection.query(updateControlQuery, [req.body.control.control, req.body.control.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al actualizar Control " + err
      });
    } else {
      return res.status(200).send({
        message: "Control actualizado correctamente"
      });
    }
  });
}

exports.deleteControl = function(req, res) {
  connection.query(deleteControlQuery, [req.body.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al eliminar Control " + err
      });
    } else {
      return res.status(200).send({
        message: "Control eliminado correctamente"
      });
    }
  });
}

exports.updateActive = function(req, res) {
  connection.query(updateActiveQuery, [req.body.active.activeName, req.body.active.activeDescription, req.body.active.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al actualizar el Activo " + err
      });
    } else {
      return res.status(200).send({
        message: "Activo actualizado correctamente"
      });
    }
  });
}

exports.deleteActive = function(req, res) {
  connection.query(deleteActiveQuery, [req.body.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al eliminar el Activo " + err
      });
    } else {
      return res.status(200).send({
        message: "Activo eliminado correctamente"
      });
    }
  });
}

exports.updateCriticalActive = function(req, res) {
  connection.query(updateCriticalActiveQuery, [req.body.active.justification, req.body.active.description, req.body.active.owner, req.body.active.confidentiality, req.body.active.integrity, req.body.active.requirements, req.body.active.availability, req.body.active.active.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al actualizar el Activo " + err
      });
    } else {
      return res.status(200).send({
        message: "Activo crítico actualizado correctamente"
      });
    }
  });
}

exports.deleteCriticalActive = function(req, res) {
  connection.query(deleteCriticalActiveQuery, [req.body.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al eliminar el Activo Crítico " + err
      });
    } else {
      return res.status(200).send({
        message: "Activo crítico eliminado correctamente"
      });
    }
  });
}

exports.updateRiskCriteria = function(req, res) {
  connection.query(updateRiskCriteriaQuery, [req.body.risk.bajo, req.body.risk.moderado, req.body.risk.alto, req.body.risk.impactArea.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al actualizar la medida de riesgo " + err
      });
    } else {
      return res.status(200).send({
        message: "Medida de Riesgo actualizada correctamente"
      });
    }
  });
}

exports.deleteRiskCriteria = function(req, res) {
  connection.query(deleteRiskCriteriaQuery, [req.body.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al eliminar la medida de riesgo " + err
      });
    } else {
      return res.status(200).send({
        message: "Medida de Riesgo eliminada correctamente"
      });
    }
  });
}


exports.getContainers = function(req, res) {
  connection.query(getContainersQuery, function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al obtener los contenedores " + err
      });
    } else {
      res.json(rows);
    }
  });
}

exports.updateContainer = function(req, res) {
  console.log(req.body);
  connection.query(updateContainerQuery, [req.body.container.name, req.body.container.internalDescription, req.body.container.internalOwner, req.body.container.externalDescription, req.body.container.externalOwner, req.body.container.containerType.type, req.body.container.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al actualizar el contenedor " + err
      });
    } else {
      return res.status(200).send({
        message: "Contenedor actualizado correctamente"
      });
    }
  });
}

exports.deleteContainer = function(req, res) {
  connection.query(deleteContainerQuery, [req.body.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al eliminar el contenedor " + err
      });
    } else {
      return res.status(200).send({
        message: "Contenedor eliminado correctamente"
      });
    }
  });
}

exports.getConcernAreas = function(req, res) {
  connection.query(getConcernAreasQuery, function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al obtener los contenedores " + err
      });
    } else {
      res.json(rows);
    }
  });
}
exports.getConcernAreasPDF = function(req, res) {
  connection.query(getConcernAreasPDFQuery, function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al obtener los contenedores " + err
      });
    } else {
      console.log("rows",rows);
      res.json(rows);
    }
  });
}

exports.getConsequences = function(req, res) {
  connection.query(getConsequencesQuery, [req.body.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al obtener los contenedores " + err
      });
    } else {
      res.json(rows);
    }
  });
}
exports.getConsequencesPDF = function(req, res) {
  connection.query(getConsequencesPDFQuery, [req.body.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al obtener los contenedores " + err
      });
    } else {
      res.json(rows);
    }
  });
}

exports.updateConcernArea = function(req, res) {
  console.log("req.body.area", req.body.area);
  connection.query(updateConcernAreaQuery, [req.body.area.criticalActive.activo_id, req.body.area.concernArea, req.body.area.actor, req.body.area.medium, req.body.area.motive, req.body.area.requirements, req.body.area.result.id, req.body.area.probability.id, req.body.area.action.id, req.body.area.id], function(err, rows, fields) {
    if (err) {
      console.log("err", err);
      return res.status(400).send({
        message: "Ocurrio un error al actualiar el área de Preocupación " + err
      });
    } else {
      //var idrow = rows.insertId;
      var id = req.body.area.id;
      var promises = [];
      var areaOrderPromise = function(response, reject) {
        connection.query(getAreaImpactoByOrderQuery, function(err, areas, fields) {
          if (err) {
            reject(err);
          } else {
            response(areas);
          }
        });
      }
      promises.push(new Promise(areaOrderPromise));
      Promise.all(promises).then(function(areas) {
        promises = [];
        var removeConsequencesPromise = function(response, reject) {
          connection.query(deleteConsequencesAreaQuery, [id], function(err, rows, fields) {
            if (err) {
              reject(err);
            } else {
              response(areas[0]);
            }
          });
        }
        promises.push(new Promise(removeConsequencesPromise));
        Promise.all(promises).then(function(areas) {
          var areasList = areas[0];
          console.log("areas", JSON.stringify(areasList));
          var saveConsequencesPromise = function(response, reject) {
            console.log("areas.length", areasList.length);

            for (var j = 0; j < areasList.length; j++) {
              console.log("entró", areasList[j].id);
              console.log("req.body.area.consequences[i].area.id", req.body.area.consequences[i].area.id);
              if (req.body.area.consequences[i].area.id === areasList[j].id) {
                console.log("req.body.area.consequences[i]",req.body.area.consequences[i]);
                req.body.area.consequences[i].score = req.body.area.consequences[i].impactValue * areasList[j].indice;
                console.log("req.body.area.consequences[i].score", req.body.area.consequences[i].score);
                break;
              }
            }
            connection.query(saveConsequencesQuery, [req.body.area.consequences[i].name, req.body.area.consequences[i].description, req.body.area.consequences[i].area.id, req.body.area.consequences[i].impactValue, req.body.area.consequences[i].score], function(err, rows, fields) {
              var idConsequence = rows.insertId;
              connection.query(saveConsequenceAreaQuery, [req.body.area.id, idConsequence], function(err, rows, fields) {
                response("Area de Preocupación Guardada Correctamente");
              });
            });
          }
          for (var i = 0; i < req.body.area.consequences.length; i++) {
            promises.push(new Promise(saveConsequencesPromise));
          }
          Promise.all(promises).then(function() {
            return res.status(200).send({
              message: "Documentación de Area de Preocupación Guardada Correctamente"
            });
          }, function(reason) {
            callback(reason, null);
          });

        }, function(reason) {
          connection.release();
          callback(reason, null);
        });


      }, function(reason) {
        connection.release();
        callback(reason, null);
      });
    }
  });
}

exports.deleteConcernArea = function(req,res)
{
  connection.query(deleteConsequencesAreaQuery, [req.body.id], function(err, rows, fields) {
    if (err) {
      return res.status(400).send({
        message: "Ocurrio un error al eliminar las consequencias del área de preocupación " + err
      });
    } else {
      connection.query(deleteConcernAreaQuery, [req.body.id], function(err, rows, fields) {
        if(err){
          return res.status(400).send({
            message: "Ocurrio un error al eliminar área de preocupación " + err
          });
        }else{
          return res.status(200).send({
            message: "Áre de Preocupación eliminada Correctamente"
          });
        }
      });
    }
  });
}
