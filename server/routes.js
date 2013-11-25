
var passport = require('./auth/passport');

var homeController   = require('./controllers/home');
var authController   = require('./controllers/auth');
var groupsController = require('./controllers/groups');

module.exports = function (app) {

  app.get('/', homeController.index);

  app.get('/auth/facebook', passport.authenticate('facebook'));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), authController.facebookCallback);
  app.get('/auth/logout', authController.logout);

  app.all('*', authController.isAuthenticated);

  app.get('/groups', groupsController.list);
  app.post('/groups', groupsController.create);
  app.get('/groups/:group', groupsController.show);

};