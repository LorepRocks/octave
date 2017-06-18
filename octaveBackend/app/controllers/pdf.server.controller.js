var fs = require('fs');
var pdf = require('html-pdf');
//var html = fs.readFileSync('<h1>HOla</h1>', 'utf8');
var options = {
  format: 'Letter'
};

exports.generatePDF = function(req, res) {

  pdf.create('<h1>hola</h1>', options).toFile('./pdf/businesscard.pdf', function(err, response) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
    var name = response.filename.split("/");
    var filename = name[name.length-1];
    return res.status(200).send({
      "filename" :filename
    });
  });
}

exports.download = function(req,res){
  var file = './pdf/businesscard.pdf';
  res.download(file);
}
