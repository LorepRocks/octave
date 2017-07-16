var fs = require('fs');
var pdf = require('html-pdf');
var moment = require('moment');


//var html = fs.readFileSync('<h1>HOla</h1>', 'utf8');
var options = {
  format: 'Letter',
  border: {
   top: "0.2in",            // default is 0, units: mm, cm, in, px
   right: "0.5in",
   bottom: "0.5in",
   left: "0.1in"
 },
};

var html = '<html>' +
  '<head>' +
  '<meta charset="utf-8">' +
  '  <style>' +
  '.table thead th {' +
  'vertical-align: bottom;' +
  'border-bottom: 2px solid #eceeef;' +
  '}' +
  '.thead-inverse th {' +
  'color: #fff;' +
  'background-color: #292b2c;' +
  '}' +
  '.page {' +
  'position: absolute;' +
  'height: 180mm;' +
  'width: 143mm;' +
  'display: block;' +
  'background: white;' +
  'margin-left: 20px;' +
  'margin-right: 20px;' +
  'overflow: hidden;' +
  '}' +
  '.table th,' +
  '.table td {' +
  'padding: 0.75rem;' +
  'vertical-align: top;' +
  'border-top: 1px solid #eceeef;' +
  'font-size: 10px;' +
  'width:700px;'+
  'word-wrap: break-word; !important'+
  '}' +
  'table {' +
  'border-collapse: collapse;' +
  'width: -moz-min-content;' +
  '}' +
  'body {' +
  'font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' + 'sans-serif;' +
  'font-size: 1rem;' +
  'font-weight: normal;' +
  'line-height: 1.5;' +
  'color: #292b2c;' +
  '}' +
  'html {' +
  'font-family: sans-serif;' +
  'line-height: 1.15;' +
  '-webkit-text-size-adjust: 100%;' +
  '}' +
  '.thead-default th {' +
  'color: #464a4c;' +
  'background-color: #eceeef;' +
  '}' +
  'body {' +
  'font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' + 'sans-serif;' +
  'font-size: 1rem;' +
  'font-weight: normal;' +
  'line-height: 1.5;' +
  'color: #292b2c;' +
  '}' +
  '.bd-example {' +
  'margin-right: 0;' +
  'margin-bottom: 0;' +
  'margin-left: 0;' +
  '}' +
  '.bd-example {' +
  'position: relative;' +
  'padding: 1rem;' +
  'margin: 1rem 2rem;' +
  'border: solid #f7f7f9;' +
  '}' +
  'h2 {'+
      'margin-top: 150px;'+
      'margin-bottom: 50px;'+
      'text-align: center;'+
    '}'+
    'h3 {'+
      'font-size: 12px;'+
      'font-weight: 700;'+
      'color: #959595;'+
      'text-transform: uppercase;'+
      'letter-spacing: 1px;'+
      'text-align: center;'+
      'margin-bottom: 50px;'+
    '}'+
    '.label {'+
      'display: inline;'+
      'padding: .2em .6em .3em;'+
      'font-size: 70%;'+
      'font-weight: 700;'+
      'line-height: 1;'+
      'color: #fff;'+
      'text-align: center;'+
      'white-space: nowrap;'+
      'vertical-align: baseline;'+
      'border-radius: .25em;'+
    '}'+

    '.label-success {'+
      'background-color: #777;'+
    '}'+
    'p {font-size:70%;}'+
  '</style>' +
  '</head>' +
  '<body>';



exports.generatePdfRiskCriteria = function(req, res) {
  console.log("REQ.BODY.AREA",req.body.area);
  var datenow = new Date();
  var dateFormat = moment(datenow).format("YYYY-MM-DD-HH:mm:ss");
  html +='<div class="page">' +
    '<span class="label label-success">Octave Allegro  </span> <p align="right">'+
    moment(datenow).format("YYYY-MM-DD HH:mm:ss")+'</p>'+
    '<h2>CRITERIO DE MEDIDA DE RIESGO</h2>'+
    '<h3>'+req.body.area.name+'</h3>'+
    '<div class="bd-example">' +
    '<table class="table">' +
    '<thead class="thead-inverse">' +
    '<tr>' +
    '<th colspan="4" style="text-align:center">Criterio de medida del Riesgo - '+req.body.area.name+'</th>' +
    '</tr>' +
    '</thead>' +
    '<thead class="thead-default">' +
    '<tr>' +
    '<th style="text-align:center">Área de Impacto</th>' +
    '<th style="text-align:center">Bajo</th>' +
    '<th style="text-align:center">Moderado</th>' +
    '<th style="text-align:center">Alto</th>' +
    '</tr>' +
    '</thead>' +
    '<tbody>' +
    '<tr>' +
    '<td>'+req.body.area.name+
    '</td>' +
    '<td>'+req.body.area.bajo+'</td>' +
    '<td>'+req.body.area.moderado+'</td>' +
    '<td>'+req.body.area.alto+'</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '</div>' +
    '</body>'+
    '</html>';

  var pdfname = "./public/criterioRiesgo"+'_'+dateFormat+".pdf";
  console.log("pdfname",pdfname);
  pdf.create(html).toFile(pdfname, function(err, response) {
    if (err) return console.log(err);
    //console.log(res); // { filename: '/app/businesscard.pdf' }
    var name = response.filename.split("/");
    var filename = name[name.length - 1];
    console.log("filename",filename);
    return res.status(200).send({
      "filename": filename
    });
  });
}

exports.generatePdfCriticalActive = function(req,res){
  var optionsCritical = {
    format: 'Letter',
    border: {
     top: "0.4in",            // default is 0, units: mm, cm, in, px
     right: "0.5in",
     bottom: "0.5in",
     left: "0.1in"
   },
  };
  var datenow = new Date();
  var dateFormat = moment(datenow).format("YYYY-MM-DD-HH:mm:ss");
  var html2 ='<html>' +
    '<head>' +
    '<meta charset="utf-8">' +
    '  <style>' +
    '.table thead th {' +
    'vertical-align: bottom;' +
    'border-bottom: 2px solid #eceeef;' +
    '}' +
    '.thead-inverse th {' +
    'color: #fff;' +
    'background-color: #292b2c;' +
    '}' +
    '.page {' +
    'height: 200mm;' +
    'width: 135mm;' +
    'display: block;' +
    'background: white;' +
    'page-break-after: auto;'+
    'margin-left: 30px;' +
    'margin-right: 30px;' +
    '}' +
    '.table th,' +
    '.table td {' +
    'padding: 0.75rem;' +
    'vertical-align: top;' +
    'border-top: 1px solid #eceeef;' +
    'font-size: 10px;' +
    'width:700px;'+
    'word-wrap: break-word; !important'+
    '}' +
    'table {' +
    'border-collapse: collapse;' +
    'width: -moz-min-content;' +
    '}' +
    'body {' +
    'font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' + 'sans-serif;' +
    'font-size: 1rem;' +
    'font-weight: normal;' +
    'line-height: 1.5;' +
    'color: #292b2c;' +
    '}' +
    'html {' +
    'font-family: sans-serif;' +
    'line-height: 1.15;' +
    '-webkit-text-size-adjust: 100%;' +
    '}' +
    '.thead-default th {' +
    'color: #464a4c;' +
    'background-color: #eceeef;' +
    '}' +
    'body {' +
    'font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' + 'sans-serif;' +
    'font-size: 1rem;' +
    'font-weight: normal;' +
    'line-height: 1.5;' +
    'color: #292b2c;' +
    '}' +
    '.bd-example {' +
    'margin-right: 0;' +
    'margin-bottom: 0;' +
    'margin-left: 0;' +
    '}' +
    '.bd-example {' +
    'position: relative;' +
    'padding: 1rem;' +
    'margin: 1rem 2rem;' +
    'border: solid #f7f7f9;' +
    '}' +
    'h2 {'+
        'margin-top: 10px;'+
        'margin-bottom: 50px;'+
        'text-align: center;'+
      '}'+
      'h3 {'+
        'font-size: 12px;'+
        'font-weight: 700;'+
        'color: #959595;'+
        'text-transform: uppercase;'+
        'letter-spacing: 1px;'+
        'text-align: center;'+
        'margin-bottom: 50px;'+
      '}'+
      '.label {'+
        'display: inline;'+
        'padding: .2em .6em .3em;'+
        'font-size: 70%;'+
        'font-weight: 700;'+
        'line-height: 1;'+
        'color: #fff;'+
        'text-align: center;'+
        'white-space: nowrap;'+
        'vertical-align: baseline;'+
        'border-radius: .25em;'+
      '}'+

      '.label-success {'+
        'background-color: #777;'+
      '}'+
      'p {font-size:70%;}'+
    '</style>' +
    '</head>' +
    '<body>'+

  '<div class="page">' +
    '<span class="label label-success">Octave Allegro  </span> <p align="right">'+
    moment(datenow).format("YYYY-MM-DD HH:mm:ss")+'</p>'+
    '<h2>PERFIL ACTIVO CRÍTICO</h2>'+
    '<h3>'+req.body.active.name+'</h3>'+

    '  <table class="table">'+
        '<thead class="thead-inverse">'+
          '<tr>'+
            '<th colspan="4" style="text-align:center">Perfil de Activos Críticos</th>'+
          '</tr>'+
        '</thead>'+
        '<tr>'+
          '<td>Activo Crítico</td>'+
          '<td>'+req.body.active.name+'</td>'+
        '</tr>'+
        '<tr>'+
          '<td>Justificación</td>'+
          '<td colspan="4">'+(req.body.active.Justificacion ? req.body.active.Justificacion : 'sin registrar' )+'</td>'+
        '</tr>'+
        '<tr>'+
          '<td>Descripción</td>'+
          '<td colspan="4">'+req.body.active.descripcion+'</td>'+
        '</tr>'+
          '<thead class="thead-inverse">'+
            '<tr>'+
              '<th colspan="4" style="text-align:center">Propietarios</th>'+
            '</tr>'+
          '</thead>'+
          '<tr>'+
            '<td colspan="4">'+(req.body.active.propietarios ? req.body.active.propietarios : 'sin registrar')+'</td>'+
          '</tr>'+
          '<thead class="thead-inverse">'+
            '<tr>'+
              '<th colspan="4" style="text-align:center">Requisitos de Seguridad</th>'+
            '</tr>'+
          '</thead>'+
          '<tr>'+
            '<td>Confidencialidad</td>'+
            '<td colspan="3">'+(req.body.active.confidencialidad ? req.body.active.confidencialidad : 'sin registrar')+'</td>'+
          '</tr>'+
          '<tr>'+
            '<td>Disponibilidad</td>'+
            '<td colspan="3">'+(req.body.active.disponibilidad ? req.body.active.disponibilidad : 'sin registrar')+'</td>'+
          '</tr>'+
          '<tr>'+
            '<td>Integridad</td>'+
            '<td colspan="3">'+(req.body.active.integridad ? req.body.active.integridad : 'sin registrar')+'</td>'+
          '</tr>'+
          '<tr>'+
            '<td>Confidencialidad</td>'+
            '<td colspan="3">'+(req.body.active.confidencialidad ? req.body.active.confidencialidad : 'sin registrar')+'</td>'+
          '</tr>'+
          '<tr>'+
            '<td>Disponibilidad</td>'+
            '<td colspan="3">'+(req.body.active.disponibilidad ? req.body.active.disponibilidad : 'sin registrar')+'</td>'+
          '</tr>'+
          '<thead class="thead-inverse">'+
            '<tr>'+
              '<th colspan="3" style="text-align:center">Requisitos de seguridad más importantes</th>'+
            '</tr>'+
          '</thead>'+
          '<tr>'+
            '<td colspan="4" >'+(req.body.active.requisitos_importantes ? req.body.active.requisitos_importantes : 'sin registrar' )+'</td>'+
          '</tr>'+
        '</tbody>'+
      '</table>'+
  '</div>'+
'</body>'+
'</html>';
var pdfname = "./public/actCritico"+'_'+dateFormat+".pdf";
//console.log("pdfname",pdfname);
pdf.create(html2,optionsCritical).toFile(pdfname, function(err, response) {
  if (err) return console.log(err);
  //console.log(res); // { filename: '/app/businesscard.pdf' }
  var name = response.filename.split("/");
  var filename = name[name.length - 1];
//  console.log("filename",filename);
  return res.status(200).send({
    "filename": filename
  });
});
}

exports.generatePdfAreaDocument = function(req,res){
  var datenow = new Date();
  var optionsConcern = {
    format: 'Letter',
    border: {
     top: "0.7in",            // default is 0, units: mm, cm, in, px
     right: "0.5in",
     bottom: "0.5in",
     left: "0.1in"
   },
  };
  var dateFormat = moment(datenow).format("YYYY-MM-DD-HH:mm:ss");
  var html2 ='<html>' +
    '<head>' +
    '<meta charset="utf-8">' +
    '  <style>' +
    '.table thead th {' +
    'vertical-align: bottom;' +
    'border-bottom: 2px solid #eceeef;' +
    '}' +
    '.thead-inverse th {' +
    'color: #fff;' +
    'background-color: #292b2c;' +
    '}' +
    '.page {' +
    'height: 200mm;' +
    'width: 135mm;' +
    'display: block;' +
    'background: white;' +
    'margin-left: 30px;' +
    'margin-right: 30px;' +
    '}' +
    '.table th,' +
    '.table td {' +
    'padding: 0.75rem;' +
    'vertical-align: top;' +
    'border-top: 1px solid #eceeef;' +
    'font-size: 8px;' +
    'width:700px;'+
    'word-wrap: break-word; !important'+
    '}' +
    'table {' +
    'border-collapse: collapse;' +
    'width: -moz-min-content;' +
    '}' +
    'body {' +
    'font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' + 'sans-serif;' +
    'font-size: 1rem;' +
    'font-weight: normal;' +
    'line-height: 1.5;' +
    'color: #292b2c;' +
    '}' +
    'html {' +
    'font-family: sans-serif;' +
    'line-height: 1.15;' +
    '-webkit-text-size-adjust: 100%;' +
    '}' +
    '.thead-default th {' +
    'color: #464a4c;' +
    'background-color: #eceeef;' +
    '}' +
    'body {' +
    'font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' + 'sans-serif;' +
    'font-size: 1rem;' +
    'font-weight: normal;' +
    'line-height: 1.5;' +
    'color: #292b2c;' +
    '}' +
    '.bd-example {' +
    'margin-right: 0;' +
    'margin-bottom: 0;' +
    'margin-left: 0;' +
    '}' +
    '.bd-example {' +
    'position: relative;' +
    'padding: 1rem;' +
    'margin: 1rem 2rem;' +
    'border: solid #f7f7f9;' +
    '}' +
    'h3 {'+
        'margin-top: 30px;'+
        'margin-bottom: 20px;'+
        'text-align: center;'+
      '}'+
      'h4 {'+
        'font-size: 12px;'+
        'font-weight: 700;'+
        'color: #959595;'+
        'text-transform: uppercase;'+
        'letter-spacing: 1px;'+
        'text-align: center;'+
        'margin-bottom: 20px;'+
      '}'+
      '.gray {'+
      'background-color: #eceeef;'+
    '}'+
    '.black {'+
      'color: #fff;'+
      'background-color: #292b2c;'+
    '}'+
      '.label {'+
        'display: inline;'+
        'padding: .2em .6em .3em;'+
        'font-size: 70%;'+
        'font-weight: 700;'+
        'line-height: 1;'+
        'color: #fff;'+
        'text-align: center;'+
        'white-space: nowrap;'+
        'vertical-align: baseline;'+
        'border-radius: .25em;'+
      '}'+

      '.label-success {'+
        'background-color: #777;'+
      '}'+
      'p {font-size:70%;}'+
    '</style>' +
    '</head>' +
    '<body>'+

  '<div class="page">' +
    '<span class="label label-success">Octave Allegro  </span> <p align="right">'+
    moment(datenow).format("YYYY-MM-DD HH:mm:ss")+'</p>'+
    '<h3>DOCUMENTACIÓN ÁREA DE PREOCUPACIÓN</h3>'+
    '<h4>'+req.body.area.name+'</h4>'+
    '<table class="table">'+
       '<thead class="thead-inverse">'+
         '<tr>'+
           '<th colspan="4" style="text-align:center">Riesgos de Activos de Información</th>'+
         '</tr>'+
       '</thead>'+
       '<tbody>'+
         '<tr>'+
           '<td class="gray">Activo de Información</td>'+
           '<td colspan="3">'+req.body.area.activo+'</td>'+
         '</tr>'+
         '<tr>'+
           '<td class="black">Área de Preocupación</td>'+
           '<td colspan="3">'+req.body.area.name+'</td>'+
         '</tr>'+
         '<tr>'+
           '<td class="gray">Actor</td>'+
           '<td colspan="3">'+req.body.area.actor+'</td>'+
         '</tr>'+
         '<tr>'+
           '<td class="black">Medios</td>'+
           '<td colspan="3">'+req.body.area.medio+'</td>'+
         '</tr>'+
         '<tr>'+
           '<td class="gray">Motivo</td>'+
           '<td colspan="3">'+req.body.area.motivo+'</td>'+
         '</tr>'+
          '<tr>'+
           '<td class="black">Resultado</td>'+
           '<td colspan="3">'+req.body.area.resultado+'</td>'+
         '</tr>'+
         '<tr>'+
           '<td class="gray">Requisitos de Seguridad</td>'+
           '<td colspan="3">'+req.body.area.requisitos_seguridad+'</td>'+
         '</tr>'+
         '<tr>'+
           '<td>Probabilidad</td>'+
           '<td colspan="3">'+req.body.area.probabilidad+'</td>'+
         '</tr>'+
         '<tr>'+
           '<td  class="black" rowspan= "2">Consecuencias</td>'+
           '<td  class="black" style="text-align:center" colspan="3">Gravedad</td>'+
         '</tr>'+
         '<tr>'+
           '<td  class="black" style="text-align:center">Área de Impacto</td>'+
           '<td class="black" style="text-align:center">Valor de Impacto</td>'+
           '<td  class="black" style="text-align:center">Puntaje</td>'+
         '</tr>';
         var score = 0;
         for(var i = 0; i<req.body.area.consequences.length;i++)
         {
           score = score + req.body.area.consequences[i].puntaje;
           html2 +='<tr>'+
             '<td>'+req.body.area.consequences[i].description+'</td>'+
             '<td>'+req.body.area.consequences[i].area_name+'</td>'+
             '<td>'+req.body.area.consequences[i].impactValue+'</td>'+
             '<td>'+req.body.area.consequences[i].puntaje+'</td>'+
           '</tr>';
         }
         html2 +='<tr>'+
           '<td colspan="3">Puntaje Riesgo Relativo</td>'+
           '<td>'+score+'</td>'+
         '</tr>'+
         '<thead class="thead-inverse">'+
           '<tr>'+
             '<th colspan="4" style="text-align:center">Acción a Tomar</th>'+
           '</tr>'+
         '</thead>'+
         '<tr>'+
           '<td style="text-align:center" colspan="4">'+req.body.area.accion+'</td>'+
         '</tr>'+
       '</tbody>'+
     '</table>'+
  '</div>'+
'</body>'+
'</html>';
var pdfname = "./public/areaPre"+'_'+dateFormat+".pdf";
//console.log("pdfname",pdfname);
pdf.create(html2,optionsConcern).toFile(pdfname, function(err, response) {
  if (err) return console.log(err);
  //console.log(res); // { filename: '/app/businesscard.pdf' }
  var name = response.filename.split("/");
  var filename = name[name.length - 1];
  //console.log("filename",filename);
  return res.status(200).send({
    "filename": filename
  });
});


}

exports.generatePDFRelative = function(req,res){
  var datenow = new Date();
  var dateFormat = moment(datenow).format("YYYY-MM-DD-HH:mm:ss");
  var html2 ='<html>' +
    '<head>' +
    '<meta charset="utf-8">' +
    '  <style>' +
    '.table thead th {' +
    'vertical-align: bottom;' +
    'border-bottom: 2px solid #eceeef;' +
    '}' +
    '.thead-inverse th {' +
    'color: #fff;' +
    'background-color: #292b2c;' +
    '}' +
    '.page {' +
    'position: absolute;' +
    'height: 200mm;' +
    'width: 135mm;' +
    'display: block;' +
    'background: white;' +
    'margin-left: 30px;' +
    'margin-right: 30px;' +
    'overflow: hidden;' +
    '}' +
    '.table th,' +
    '.table td {' +
    'padding: 0.75rem;' +
    'vertical-align: top;' +
    'border-top: 1px solid #eceeef;' +
    'font-size: 10px;' +
    'width:700px;'+
    'word-wrap: break-word; !important'+
    '}' +
    'table {' +
    'border-collapse: collapse;' +
    'width: -moz-min-content;' +
    '}' +
    'body {' +
    'font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' + 'sans-serif;' +
    'font-size: 1rem;' +
    'font-weight: normal;' +
    'line-height: 1.5;' +
    'color: #292b2c;' +
    '}' +
    'html {' +
    'font-family: sans-serif;' +
    'line-height: 1.15;' +
    '-webkit-text-size-adjust: 100%;' +
    '}' +
    '.thead-default th {' +
    'color: #464a4c;' +
    'background-color: #eceeef;' +
    '}' +
    'body {' +
    'font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' + 'sans-serif;' +
    'font-size: 1rem;' +
    'font-weight: normal;' +
    'line-height: 1.5;' +
    'color: #292b2c;' +
    '}' +
    '.bd-example {' +
    'margin-right: 0;' +
    'margin-bottom: 0;' +
    'margin-left: 0;' +
    '}' +
    '.bd-example {' +
    'position: relative;' +
    'padding: 1rem;' +
    'margin: 1rem 2rem;' +
    'border: solid #f7f7f9;' +
    '}' +
    'h3 {'+
        'margin-top: 100px;'+
        'margin-bottom: 40px;'+
        'text-align: center;'+
      '}'+
      'h4 {'+
        'font-size: 12px;'+
        'font-weight: 700;'+
        'color: #959595;'+
        'text-transform: uppercase;'+
        'letter-spacing: 1px;'+
        'text-align: center;'+
        'margin-bottom: 40px;'+
      '}'+
      '.gray {'+
      'background-color: #eceeef;'+
    '}'+
    '.black {'+
      'color: #fff;'+
      'background-color: #292b2c;'+
    '}'+
      '.label {'+
        'display: inline;'+
        'padding: .2em .6em .3em;'+
        'font-size: 70%;'+
        'font-weight: 700;'+
        'line-height: 1;'+
        'color: #fff;'+
        'text-align: center;'+
        'white-space: nowrap;'+
        'vertical-align: baseline;'+
        'border-radius: .25em;'+
      '}'+

      '.label-success {'+
        'background-color: #777;'+
      '}'+
      'p {font-size:70%;}'+
    '</style>' +
    '</head>' +
    '<body>'+
  '<div class="page">' +
    '<span class="label label-success">Octave Allegro  </span> <p align="right">'+
    moment(datenow).format("YYYY-MM-DD HH:mm:ss")+'</p>'+
    '<h3>PUNTAJE RELATIVO Y PROBABILIDAD SUBJETIVA</h3>'+
    '<h4>'+req.body.area.name+'</h4>'+
      '<table class="table">'+

        '<tr>'+
          '<td class="black" rowspan="2">Consecuencias</td>'+
          '<td class="black" style="text-align:center" colspan="3">Gravedad</td>'+
        '</tr>'+
        '<tr>'+
          '<td class="black" style="text-align:center">Área de Impacto</td>'+
          '<td class="black" style="text-align:center">Valor de Impacto</td>'+
          '<td class="black" style="text-align:center">Puntaje</td>'+
        '</tr>';

        var score = 0;
        for(var i = 0; i<req.body.area.consequences.length;i++)
        {
          score = score + req.body.area.consequences[i].puntaje;
          html2 +='<tr>'+
            '<td>'+req.body.area.consequences[i].description+'</td>'+
            '<td>'+req.body.area.consequences[i].area_name+'</td>'+
            '<td>'+req.body.area.consequences[i].impactValue+'</td>'+
            '<td style="text-align:center">'+req.body.area.consequences[i].puntaje+'</td>'+
          '</tr>';
        }

        html2 +='<tr>'+
          '<td colspan="3">Puntaje Riesgo Relativo</td>'+
          '<td style="text-align:center">'+score+'</td>'+
        '</tr>'+
        '<tr>'+
          '<tr>'+
            '<td colspan="3">Probabilidad Subjetiva</td>'+
            '<td style="text-align:center">'+req.body.area.probability+'</td>'+
          '</tr>'+
      '</table>'+
  '</div>'+
'</body>'+
'</html>';
var pdfname = "./public/prob"+'_'+dateFormat+".pdf";
//console.log("pdfname",pdfname);
pdf.create(html2).toFile(pdfname, function(err, response) {
  if (err) return console.log(err);
  //console.log(res); // { filename: '/app/businesscard.pdf' }
  var name = response.filename.split("/");
  var filename = name[name.length - 1];
  //console.log("filename",filename);
  return res.status(200).send({
    "filename": filename
  });
});
}

exports.generatePdfAction = function(req,res){
  var datenow = new Date();
  var dateFormat = moment(datenow).format("YYYY-MM-DD-HH:mm:ss");
  var html2 ='<html>' +
    '<head>' +
    '<meta charset="utf-8">' +
    '  <style>' +
    '.table thead th {' +
    'vertical-align: bottom;' +
    'border-bottom: 2px solid #eceeef;' +
    '}' +
    '.thead-inverse th {' +
    'color: #fff;' +
    'background-color: #292b2c;' +
    '}' +
    '.page {' +
    'height: 200mm;' +
    'width: 135mm;' +
    'display: block;' +
    'background: white;' +
    'margin-left: 30px;' +
    'margin-right: 30px;' +
    '}' +
    '.table th,' +
    '.table td {' +
    'padding: 0.75rem;' +
    'vertical-align: top;' +
    'border-top: 1px solid #eceeef;' +
    'font-size: 10px;' +
    'width:700px;'+
    'word-wrap: break-word; !important'+
    '}' +
    'table {' +
    'border-collapse: collapse;' +
    'width: -moz-min-content;' +
    'table-layout: fixed;'+
    '}' +
    'body {' +
    'font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' + 'sans-serif;' +
    'font-size: 1rem;' +
    'font-weight: normal;' +
    'line-height: 1.5;' +
    'color: #292b2c;' +
    '}' +
    'html {' +
    'font-family: sans-serif;' +
    'line-height: 1.15;' +
    '-webkit-text-size-adjust: 100%;' +
    '}' +
    '.thead-default th {' +
    'color: #464a4c;' +
    'background-color: #eceeef;' +
    '}' +
    'body {' +
    'font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,' + 'sans-serif;' +
    'font-size: 1rem;' +
    'font-weight: normal;' +
    'line-height: 1.5;' +
    'color: #292b2c;' +
    '}' +
    '.bd-example {' +
    'margin-right: 0;' +
    'margin-bottom: 0;' +
    'margin-left: 0;' +
    '}' +
    '.bd-example {' +
    'position: relative;' +
    'padding: 1rem;' +
    'margin: 1rem 2rem;' +
    'border: solid #f7f7f9;' +
    '}' +
    'h3 {'+
        'margin-top: 100px;'+
        'margin-bottom: 40px;'+
        'text-align: center;'+
      '}'+
      'h4 {'+
        'font-size: 12px;'+
        'font-weight: 700;'+
        'color: #959595;'+
        'text-transform: uppercase;'+
        'letter-spacing: 1px;'+
        'text-align: center;'+
        'margin-bottom: 40px;'+
      '}'+
      '.gray {'+
      'background-color: #eceeef;'+
    '}'+
    '.black {'+
      'color: #fff;'+
      'background-color: #292b2c;'+
    '}'+
      '.label {'+
        'display: inline;'+
        'padding: .2em .6em .3em;'+
        'font-size: 70%;'+
        'font-weight: 700;'+
        'line-height: 1;'+
        'color: #fff;'+
        'text-align: center;'+
        'white-space: nowrap;'+
        'vertical-align: baseline;'+
        'border-radius: .25em;'+
      '}'+
      '.Grupo1{'+
        'background-color: #F78181;'+
      '}'+
      '.Grupo2{'+
        'background-color: #F3F781;'+
      '}'+
      '.Grupo3{'+
        'background-color: #A5DF00;'+
      '}'+
      '.Grupo4{'+
        'background-color: #D8D8D8;'+
      '}'+
      '.label-success {'+
        'background-color: #777;'+
      '}'+
      'p {font-size:70%;}'+
    '</style>' +
    '</head>' +
    '<body>'+
  '<div class="page">' +
    '<span class="label label-success">Octave Allegro  </span> <p align="right">'+
    moment(datenow).format("YYYY-MM-DD HH:mm:ss")+'</p>'+
    '<h3>ENFOQUE DE MITIGACIÓN</h3>'+
    '<h4>'+req.body.area.name+'</h4>'+
    '<table class="table">'+
           '<thead class="thead-inverse">'+
             '<tr>'+
               '<th colspan="2" style="text-align:center">ENFOQUE DE MITIGACIÓN</th>'+
             '</tr>'+
           '</thead>'+
           '<tbody>'+
             '<tr>'+
               '<td class="gray" colspan="2" style="text-align:center">Área de Preocupación</td>'+
             '</tr>'+
             '<tr>'+
               '<td colspan="2" style="text-align:center">'+req.body.area.name+'</td>'+
             '</tr>'+
             '<tr>'+
               '<td class="gray">Putaje Riesgo Relativo</td>'+
               '<td>'+req.body.area.action[0].score+'</td>'+
             '</tr>'+
             '<tr>'+
               '<td class="gray">Probabilidad Subjetiva</td>'+
               '<td>'+req.body.area.action[0].subjetiva+'</td>'+
             '</tr>'+
             '<tr>'+
               '<td class="gray">Categorización</td>'+
               '<td class="'+req.body.area.action[0].grupo.replace(" ","")+'">'+req.body.area.action[0].grupo+'</td>'+
             '</tr>'+
              '<tr>'+
               '<td class="gray">Acción Sugerida</td>'+
               '<td>'+req.body.area.action[0].accion+'</td>'+
             '</tr>'+
             '<tr>'+
               '<td colspan="2" class="black" style="text-align:center">CONTROLES</td>'+
             '</tr>';
             for(var i = 0; i<req.body.area.controls.length;i++){
               html2+='<tr>'+
              '<td style="text-align:justify" colspan="2">'+req.body.area.controls[i].control+'</td>'+
              ' </tr>';
             }

           html2+='</tbody>'+
         '</table>'+
  '</div>'+
'</body>'+
'</html>';
var pdfname = "./public/accion"+'_'+dateFormat+".pdf";
console.log("pdfname",pdfname);
pdf.create(html2,options).toFile(pdfname, function(err, response) {
  if (err) return console.log(err);
  //console.log(res); // { filename: '/app/businesscard.pdf' }
  var name = response.filename.split("/");
  var filename = name[name.length - 1];
  console.log("filename",filename);
  return res.status(200).send({
    "filename": filename
  });
});
}
