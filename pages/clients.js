module.exports = function(app, urlencodedParser){

    app.get('/clients', function(req, res){
        res.sendFile( __dirname + "/clients.html" );
    });

    app.post('/clients', urlencodedParser, function (req, res) {
      // Prepare output in JSON format
      response = {
        username:req.body.username,
        passcode:req.body.passcode
      };
      console.log(response);
      res.end(JSON.stringify(response));
    })

}
