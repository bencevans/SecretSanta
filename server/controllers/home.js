module.exports.index = function(req, res) {

  if(!req.isAuthenticated()) {
    return res.sendfile('./views/home.html');
  }

  res.redirect('/groups');

};