
module.exports.facebookCallback = function(req, res) {
  res.redirect('/');
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