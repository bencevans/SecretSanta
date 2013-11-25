
var passport = require('passport');
var db       = require('../db');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.find(id).done(function(err, user) {
    done(err, user);
  });
});

passport.use(require('./facebook'));

module.exports = passport;