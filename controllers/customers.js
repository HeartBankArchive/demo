module.exports = (heartbank, app) => {

  app.get('/customers', (req, res, next) => {
    heartbank.customers(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).get()
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

}
