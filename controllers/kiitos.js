module.exports = app => {

  app.get('/kiitos', (req, res) => {
    res.render('kiitos', {cookies:req.cookies});
  });

}
