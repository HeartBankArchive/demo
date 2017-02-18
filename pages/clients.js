module.exports = function(app){

    app.get('/clients', function(req, res){
        res.sendFile( __dirname + "/clients.html" );
    });

}
