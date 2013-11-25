
var db = require('../db');

module.exports.list = function(req, res, next) {
  req.user.getGroups().success(function(groups) {
    res.render('groups', { groups: groups });
  }).error(next);
};

module.exports.create = function (req, res, next) {
  delete req.body._csrf;
  db.Group.create(req.body).success(function(group) {
    group.addUser(req.user).success(function() {
      res.redirect('/groups/' + group.id);
    }).error(next);
  }).error(next);
};

module.exports.show = function(req, res, next) {
  db.Group.find({ where: {id:req.params.group}}).success(function(group) {
    if(!group) {
      return next();
    }
    group.getUsers({ where: { id: req.user.id }}).success(function(users) {
      if(users.length < 1) {
        return next();
      }
      res.send(group.dataValues);
    }).error(next);
  }).error(next);
};