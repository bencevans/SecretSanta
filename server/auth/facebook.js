
var FacebookStrategy = require('passport-facebook');
var db               = require('../db');
var config           = require('../../config');


module.exports = new FacebookStrategy(config.facebook,
  function(accessToken, refreshToken, profile, done) {
    db.User.findOrCreate({ facebookId: profile.id }).done(function(err, user) {
      if(err) {
        return done(err);
      }
      done(err, user.dataValues);
    });
  }
);