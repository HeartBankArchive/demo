module.exports = (heartbank, app, urlencodedParser) => {

    const clients = heartbank.clients();

    app.get('/clients', (req, res) => {
      res.render('clients', {});
    });

    app.post('/clients', urlencodedParser, (req, res, next) => {
      clients.auth(req.body.username, req.body.passcode)
      .then(data => {
        if (data.code === 200) {
          res.cookie("client_id",data.client);
          res.cookie("auth_token",data.token);
          res.cookie("branch_id",data.branch);
          res.cookie("customer_id",data.customer);
          res.cookie("user_id",data.user);
          res.redirect('/');
        } else {
          res.send(data);
        }
      })
      .catch(error => {
        next(error);
      });
    });

}
