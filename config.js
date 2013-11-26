
var fs     = require('fs');
var extend = require('extend');

module.exports = {
  port: process.env.PORT || 3000,
  sessionSecret: null,
  siteURL: 'http://localhost:3000',
  db: {
    dialect:  'postgres',
    username: 'postgres',
    database: 'secret_santa_development',
    host:     '127.0.0.1',
    native: true,
    migrationsPath: '../../server/migrations'
  },
  facebook: {
    clientID: null,
    clientSecret: null,
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  enviroments: {
    production: {
      siteURL: 'http://secretsanta.bensbit.co.uk',
      db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host:     process.env.DB_HOST,
      },
      facebook: {
        clientID:     process.env.FACEBOOK_CLIENTID,
        clientSecret: process.env.FACEBOOK_CLIENTSECRET,
        callbackURL: 'http://secretsanta.bensbit.co.uk/auth/facebook/callback'
      }
    }
  }
};

if(fs.existsSync('./config.user.js')) {
  module.exports = extend(true, module.exports, require('./config.user.js'));
}

module.exports = extend(true, module.exports, module.exports.enviroments[process.env.NODE_ENV] || {});
