module.exports = (heartbank, app) => {

  app.get('/branches', (req, res, next) => {
    heartbank.branches(req.cookies.client_id, req.cookies.auth_token).get({branch_id:req.cookies.branch_id})
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.render('branches', {branch:data.branch});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

}
