module.exports = (heartbank, app) => {

  app.get('/customers', (req, res, next) => {
    heartbank.customers(req.cookies.client_id, req.cookies.auth_token).get({customer_id:req.cookies.customer_id})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.render('customers', {customer:data.customer});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.post('/customers', (req, res, next) => {
    heartbank.customers(req.cookies.client_id, req.cookies.auth_token).post({customer_id:req.cookies.customer_id, message:req.body.message})
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

}
