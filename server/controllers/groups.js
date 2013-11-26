
var db = require('../db');
var randomstring = require('randomstring');

module.exports.list = function(req, res, next) {
  req.user.getGroups({}).success(function(groups) {
    res.render('groups', { groups: groups });
  }).error(next);
};

var config = require('../../config');

module.exports.create = function (req, res, next) {
  delete req.body._csrf;
  req.body.inviteCode = randomstring.generate(10);
  db.Group.create(req.body).success(function(group) {
    group.addUser(req.user).success(function() {
      res.redirect('/groups/' + group.id);
    }).error(next);
  }).error(next);
};

module.exports.show = function(req, res, next) {
  db.Group.find({ where: {id:req.params.group} }).success(function(group) {
    if(!group) {
      return next();
    }
    group.getUsers({ where: { id: req.user.id }}).success(function(users) {
      if(users.length < 1) {
        return next();
      }
      group.getUsers({}, ['id']).success(function(users) {
        res.render('group', {
          group: group.dataValues,
          users: users,
          inviteURL: config.siteURL + '/groups/' + group.id + '/invite?code=' + group.inviteCode
        });
      }).error(next);
    }).error(next);
  }).error(next);
};

module.exports.showInvite = function(req, res, next) {
  if(!req.query.code) {
    return next();
  }
  db.Group.find({ where: { id: req.params.group, inviteCode: req.query.code } })
  .success(function(group) {
    if(!group) {
      return next();
    }
    group.getUsers({}, ['id']).success(function(users) {
      var authenticated = req.isAuthenticated();
      if(!authenticated) {
        req.session.loginRedirect = '/groups/' + group.id + '/invite?code=' + group.inviteCode;
      }
      res.render('invite', { group: group, users: users, authenticated: authenticated});
    }).error(next)
  })
  .error(next);
}

module.exports.acceptInvite = function(req, res, next) {
  db.Group.find({ where: { id: req.body.group, inviteCode: req.body.code } })
  .success(function(group) {
    if(!group) {
      return next();
    }
    group.addUser(req.user).success(function() {
      res.redirect('/groups/' + group.id);
    })
    .error(next);
  })
  .error(next);
}