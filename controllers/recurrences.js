const fs = require('fs');
const path = require('path');

module.exports = (heartbank, app) => {

  app.get('/recurrences', (req, res, next) => {

    const members = heartbank.branches(req.cookies.client_id, req.cookies.auth_token).get({branch_id:req.cookies.branch_id});
    const recurrences = heartbank.recurrences(req.cookies.client_id, req.cookies.auth_token).get();

    Promise.all([members, recurrences])
    .then(data => {
      if (data[0].code === 200 && data[1].code === 200) {
        //console.log(JSON.stringify(data));
        res.render('recurrences', {query:req.query, members:data[0].branch.customers, recurrences:data[1].recurrences});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });

  });

  app.post('/recurrences/transaction', (req, res, next) => {
    const recurrences = heartbank.recurrences(req.cookies.client_id, req.cookies.auth_token);
    const params = {recurrence_id:req.body.id, cycle:req.body.cycle, start:req.body.date + ' ' + req.body.time, command:req.body.command, to:req.body.to, amount:req.body.amount, currency:req.body.currency, anonymity:req.body.anonymity === 'on', description:req.body.description, media:req.file ? fs.readFileSync(path.join(__dirname, '..', req.file.path)) : null};
    const request = req.body.id ? recurrences.put(params) : recurrences.post(params);
    request.then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        if (req.file) fs.unlink(path.join(__dirname, '..', req.file.path));
        res.redirect('/recurrences');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.post('/recurrences/message', (req, res, next) => {
    const recurrences = heartbank.recurrences(req.cookies.client_id, req.cookies.auth_token);
    const params = {recurrence_id:req.body.id, cycle:req.body.cycle, start:req.body.date + ' ' + req.body.time, message:req.body.message, media:req.file ? fs.readFileSync(path.join(__dirname, '..', req.file.path)) : null};
    const request = req.body.id ? recurrences.put(params) : recurrences.post(params);
    request.then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        if (req.file) fs.unlink(path.join(__dirname, '..', req.file.path));
        res.redirect('/recurrences');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

  app.get('/recurrences/:recurrence_id', (req, res, next) => {
    heartbank.recurrences(req.cookies.client_id, req.cookies.auth_token).delete({recurrence_id:req.params.recurrence_id})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.redirect('/recurrences');
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

}
