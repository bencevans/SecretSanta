
var fs     = require('fs');
var extend = require('extend');

module.exports = {
  port: process.env.PORT || 3000,
  sessionSecret: null,
  db: {
    dialect:  'postgres',
    username: 'postgres',
    database: 'secret_santa_development',
    host:     '127.0.0.1'
  },
  facebook: {
    clientID: null,
    clientSecret: null,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }
};

if(fs.existsSync('./config.user.js')) {
  module.exports = extend(true, module.exports, require('./config.user.js'));
}