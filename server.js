var express = require('express');
var app = express();

require('./pages/index')(app);
require('./pages/clients')(app);

var server = app.listen(9080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
