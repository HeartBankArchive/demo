module.exports = (heartbank, app) => {

  app.get('/users', (req, res, next) => {
    heartbank.users().get()
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.render('users', {cookies:req.cookies, user:data.user});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.get('/users/:user_id', (req, res, next) => {
    heartbank.users().get(req.params.user_id)
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.redirect('/users');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.post('/users', (req, res, next) => {
    heartbank.users().verify({address:req.body.address, message:req.body.message, signature:req.body.signature})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.json(data);
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.post('/users/:user_id', (req, res, next) => {
    heartbank.users().thank({user_id:req.params.user_id, address:req.body.address, amount:req.body.amount, description:req.body.description, pin:req.body.pin})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.redirect('/users');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.put('/users', (req, res, next) => {
    heartbank.users().webhook({url:req.body.webhook})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.render('users', {cookies:req.cookies, user:data.user});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.put('/users/:user_id', (req, res, next) => {
    heartbank.users().withdraw({user_id:req.params.user_id, address:req.body.address, cycle:req.body.cycle, pin:req.body.pin})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.redirect('/users');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

}
