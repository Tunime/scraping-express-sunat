var express = require('express');
const request = require("tinyreq"),
    cheerio= require("cheerio");

var router = express.Router();
//primero definimos que url
var producto="8548900000";
//const base_url='http://www.aduanet.gob.pe/cl-ad-itestdesp/Sgboletin?orden=part&FecInicial=08%2F09%2F2016&FecFinal=07%2F10%2F2016&codigo='+producto;
 const base_url='http://www.aduanet.gob.pe/cl-ad-itestdesp/Sgboletin?orden=part&FecInicial=08%2F09%2F2010&FecFinal=07%2F10%2F2011&codigo=8548900000';
var alvaro,alvaroo;
const lista=[];
const lis=[];

request(base_url, function (err, body) {
  const $ = cheerio.load(body);

    $('td').each(function(i,elem){
      lista[i]=$(this).text();
      lista.join(',');
    });
    for (var j = 0; j < lista.length; j++) {
      alvaro=lista[j];
      //console.log(alvaro);
   }
   console.log(lista);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/al', function(req, res, next) {
  res.render('index', { title: "alvaro ",data:lista});
});

router.post('/test/icex', function(req, res, next) {
  //capturamos los datos
  var FecInicial = req.body.FecInicial || '';
  var FecFinal = req.body.FecFinal || '';
  var codigo = req.body.codigo || '';
  //trasformamos los datos
  for(var k=0;k< FecFinal.length;k++){
      if(FecFinal[k]=='/')
      {
        FecFinal[k]='%2F';
      }
      console.log('hola como estas');
  }
  for(var k=0;k< FecInicial.length;k++){
    if(FecInicial[k]=='/')
    {
      FecInicial[k]='%2F';
    }
}
  console.log(codigo[1]);

  //la logica de scraping
  const base_url='http://www.aduanet.gob.pe/cl-ad-itestdesp/Sgboletin?orden=part&FecInicial='+FecInicial+'&FecFinal='+FecFinal+'&codigo='+codigo;
console.log(base_url);
  var alvaro,alvaroo;
const lista=[];
const lis=[];

request(base_url, function (err, body) {
  const $ = cheerio.load(body);

    $('td').each(function(i,elem){
      lista[i]=$(this).text();
      lista.join(',');
    });
    for (var j = 0; j < lista.length; j++) {
      alvaro=lista[j];
      //console.log(alvaro);
   }
   //console.log(lista);
   res.render('index', { title: "alvaro ",data:lista});
});

});
router.get('/test/icex', function(req, res, next) {
  res.render('inicio');
});


router.get('/test/formulario', function(req, res, next) {
  res.render('testformulario');
});
router.post('/test/respuesta', function(req, res, next) {
  var FecInicial = req.body.FecInicial || '';
  res.render('testrespuesta', { FecInicial: FecInicial });
});
module.exports = router;
