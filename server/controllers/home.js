module.exports.index = function(req, res) {

  if(!req.isAuthenticated()) {
    return res.render('home');
  }

  res.redirect('/groups');

};