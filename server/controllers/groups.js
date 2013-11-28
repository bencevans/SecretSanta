
var db           = require('../db');
var randomstring = require('randomstring');
var _            = require('underscore');
var async        = require('async');

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
        db.Delivery.find({ groupId: group.id, santaId: req.user.id}).success(function(delivery) {
          db.User.find({where:{id:delivery.gifteeId}}, ['id']).error(next).success(function(giftee) {
            res.render('group', {
              group: group.dataValues,
              users: users,
              inviteURL: config.siteURL + '/groups/' + group.id + '/invite?code=' + group.inviteCode,
              giftee: giftee
            });
          })
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
    }).error(next);
  })
  .error(next);
};

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
};

module.exports.startSecretSanta = function(req, res, next) {
  db.Group.find({ where: { id: req.params.group } }).success(function(group) {
    if(!group) {
      return next();
    }
    group.getUsers({}, ['id']).success(function(users) {

      users = _.map(users, function(user) { return user.id; });
      var giftees = _.clone(users);
      var deliveries = [];

      for(var i = 0; i < users.length; i++) {
        var santaId = users[i];
        var gifteeId = false;
        var position = false;
        while(!gifteeId || gifteeId === santaId) {
          position = _.random(0, giftees.length - 1);
          gifteeId = giftees[position];
        }
        delete giftees[position];
        deliveries.push({ groupId: 2, santaId: santaId, gifteeId: gifteeId });
      }

      async.map(deliveries, function(delivery, done) {
        db.Delivery.create(delivery).success(function() {
          done();
        }).error(done);
      }, function(err) {
        if(err) {
          return next(err);
        }
        res.redirect('/groups/' + group.id);
      });

    }).error(next);
  }).error(next);
};