
var config    = require('../config');
var Sequelize = require('sequelize');
var extend    = require('extend');

var sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  dialect: config.db.dialect,
  host:    config.db.host,
  port:    config.db.port,
  logging: true,
  omitNull: true
});


// Load the ORM models
//
var models = {
  User       : require('./models/user')(sequelize, Sequelize),
  Group      : require('./models/group')(sequelize, Sequelize),
  Delivery   : require('./models/delivery')(sequelize, Sequelize),
};

models.User.hasMany(models.Group);
models.Group.hasMany(models.User);

// Expose the public API
//
module.exports = extend(sequelize, models);