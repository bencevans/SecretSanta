
module.exports.facebookCallback = function(req, res) {
  var loginRedirect = req.session.loginRedirect || '/';
  delete req.session.loginRedirect;
  res.redirect(loginRedirect);
};

module.exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports.isAuthenticated = function(req, res, next) {

  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');

};