module.exports = (heartbank, app) => {

  app.get('/payments', (req, res, next) => {
    heartbank.payments(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).get()
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.render('payments', {payments:data.payments});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.post('/payments', (req, res, next) => {
    heartbank.payments(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).post({amount:req.body.command === 'charge' ? '-' + req.body.amount : req.body.amount, description:req.body.description})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.redirect('/payments');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.get('/payments/:payment_id', (req, res, next) => {
    heartbank.payments(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).get({payment_id:req.params.payment_id})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.redirect('/payments');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.post('/payments/:payment_id', (req, res, next) => {
    console.log(req.body.code);
    heartbank.payments(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).post({payment_id:req.params.payment_id, code:req.body.code})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.redirect('/payments');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

}
