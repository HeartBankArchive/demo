module.exports = (heartbank, app) => {

  app.get('/subscriptions', (req, res, next) => {
    heartbank.subscriptions(req.cookies.client_id, req.cookies.auth_token).get()
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.render('subscriptions', {query:req.query,subscriptions:data.subscriptions});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.post('/subscriptions', (req, res, next) => {
    const subscriptions = heartbank.subscriptions(req.cookies.client_id, req.cookies.auth_token);
    const params = {subscription_id:req.body.id, webhook:req.body.webhook};
    const request = req.body.id ? subscriptions.put(params) : subscriptions.post(params);
    request.then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.redirect('/subscriptions');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.get('/subscriptions/:subscription_id', (req, res, next) => {
    heartbank.subscriptions(req.cookies.client_id, req.cookies.auth_token).delete({subscription_id:req.params.subscription_id})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.redirect('/subscriptions');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

}
