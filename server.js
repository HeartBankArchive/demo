var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('tests'));

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

require('./pages/index')(app);
require('./pages/clients')(app, urlencodedParser);

var server = app.listen(9080, function () {
   var host = server.address().address
   var port = server.address().port
   //console.log("Example app listening at http://%s:%s", host, port)
})
