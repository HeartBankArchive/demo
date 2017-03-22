const fs = require('fs');
const path = require('path');

module.exports = (heartbank, app) => {

  app.get('/transactions', (req, res, next) => {

    const members = heartbank.branches(req.cookies.client_id, req.cookies.auth_token).get({branch_id:req.cookies.branch_id});

    const branch = heartbank.transactions(req.cookies.client_id, req.cookies.auth_token).get({branch_id:req.cookies.branch_id, customer:false, q:req.query.q, fetch:req.query.fetch, page:req.query.page, start:req.query.start, end:req.query.end, filters:{account:req.query.account === 'on', fund:req.query.fund === 'on', reserve:req.query.reserve === 'on'}});

    const customer = heartbank.transactions(req.cookies.client_id, req.cookies.auth_token).get({branch_id:req.cookies.branch_id, customer_id:req.cookies.customer_id, customer:true, q:req.query.q, fetch:req.query.fetch, page:req.query.page, start:req.query.start, end:req.query.end, filters:{account:req.query.account === 'on', fund:req.query.fund === 'on', reserve:req.query.reserve === 'on'}});

    Promise.all([members, branch, customer])
    .then(data => {
      if (data[0].code === 200 && (data[1].code === 200 || data[2].code === 200)) {
        //console.log(JSON.stringify(data));
        const branches = data[1].code === 200 ? data[1].transactions : [];
        const customers = data[2].code === 200 ? data[2].transactions : [];
        res.render('transactions', {query:req.query, members:data[0].branch.customers, branches, customers});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });

  });

  app.post('/transactions/transaction', (req, res, next) => {
    heartbank.transactions(req.cookies.client_id, req.cookies.auth_token).post({command:req.body.command, to:req.body.to, amount:req.body.amount, currency:req.body.currency, anonymity:req.body.anonymity === 'on', description:req.body.description, media:req.file ? fs.readFileSync(path.join(__dirname, '..', req.file.path)) : null})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        if (req.file) fs.unlink(path.join(__dirname, '..', req.file.path));
        res.redirect('/transactions');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.post('/transactions/message', (req, res, next) => {
    heartbank.transactions(req.cookies.client_id, req.cookies.auth_token).post({message:req.body.message, media:req.file ? fs.readFileSync(path.join(__dirname, '..', req.file.path)) : null})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        if (req.file) fs.unlink(path.join(__dirname, '..', req.file.path));
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
