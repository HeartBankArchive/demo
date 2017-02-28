module.exports = (heartbank, app, urlencodedParser) => {

    app.get('/transactions', urlencodedParser, (req, res, next) => {

      const branch = heartbank.transactions(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).get({customer:false, q:req.query.q, fetch:req.query.fetch, page:req.query.page, start:req.query.start, end:req.query.end, filters:{account:req.query.account === 'true', fund:req.query.fund == 'true', reserve:req.query.reserve == 'true'}});

      const customer = heartbank.transactions(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).get({customer:true, q:req.query.q, fetch:req.query.fetch, page:req.query.page, start:req.query.start, end:req.query.end, filters:{account:req.query.account === 'true', fund:req.query.fund == 'true', reserve:req.query.reserve == 'true'}});

      Promise.all([branch, customer])
      .then(data => {
        if (data[0].code === 200 && data[1].code === 200) {
          //console.log(JSON.stringify(data));
          res.render('transactions', {branch:data[0].transactions, customer:data[1].transactions});
        } else {
          res.send(JSON.stringify(data));
        }
      })
      .catch(error => {
        next(error);
      });

    });

    app.post('/transactions/transaction', urlencodedParser, (req, res, next) => {
      heartbank.transactions(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).post({command:req.body.command, to:req.body.to, amount:req.body.amount, currency:req.body.currency, anonymity:req.body.anonymity, description:req.body.description, media:req.body.media})
      .then(data => {
        if (data.code === 200) {
          console.log(JSON.stringify(data));
          res.redirect('/transactions');
        } else {
          res.send(JSON.stringify(data));
        }
      })
      .catch(error => {
        next(error);
      });
    });

    app.post('/transactions/message', urlencodedParser, (req, res, next) => {
      heartbank.transactions(req.cookies.client_id, req.cookies.auth_token, [req.cookies.branch_id, req.cookies.customer_id, req.cookies.user_id]).post({message:req.body.message, media:req.body.media})
      .then(data => {
        if (data.code === 200) {
          console.log(JSON.stringify(data));
          res.redirect('/transactions');
        } else {
          res.send(JSON.stringify(data));
        }
      })
      .catch(error => {
        next(error);
      });
    });

}
