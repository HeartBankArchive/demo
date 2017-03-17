module.exports = (heartbank, app) => {

  app.get('/users', (req, res, next) => {
    heartbank.users(req.cookies.client_id, req.cookies.auth_token).get()
    .then(data => {
      if (data.code === 200) {
        //console.log(JSON.stringify(data));
        res.render('users', {user:data.user});
      } else {
        res.send(JSON.stringify(data));
      }
    })
    .catch(error => {
      next(error);
    });
  });

}
