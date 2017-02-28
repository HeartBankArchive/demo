module.exports = (heartbank, app) => {

    const clients = heartbank.clients();

    app.get('/clients', (req, res, next) => {
      clients.get(req.cookies.client_id, req.cookies.auth_token)
      .then(data => {
        //console.log(JSON.stringify(data));
        if (data.code === 200) {
          res.render('clients', {cookies:req.cookies,clients:data.clients});
        } else {
          res.render('clients', {cookies:req.cookies,clients:[]});
        }
      })
      .catch(error => {
        next(error);
      });
    });

    app.post('/clients', (req, res, next) => {
      clients.auth(req.body.username, req.body.passcode)
      .then(data => {
        if (data.code === 200) {
          //console.log(JSON.stringify(data));
          res.cookie("client_id",data.client);
          res.cookie("auth_token",data.token);
          res.cookie("branch_id",data.branch);
          res.cookie("customer_id",data.customer);
          res.cookie("user_id",data.user);
          res.redirect('/clients');
        } else {
          res.send(JSON.stringify(data));
        }
      })
      .catch(error => {
        next(error);
      });
    });

    app.get('/clients/refresh', (req, res, next) => {
      clients.post(req.cookies.client_id, req.cookies.auth_token)
      .then(data => {
        if (data.code === 200) {
          //console.log(JSON.stringify(data));
          res.redirect('/clients');
        } else {
          res.send(JSON.stringify(data));
        }
      })
      .catch(error => {
        next(error);
      });
    });

    app.get('/clients/switch', (req, res) => {
      res.cookie("client_id",req.query.client);
      res.cookie("auth_token",req.query.token);
      res.cookie("branch_id",req.query.branch);
      res.cookie("customer_id",req.query.customer);
      res.cookie("user_id",req.query.user);
      res.redirect('/clients');
    });

}
