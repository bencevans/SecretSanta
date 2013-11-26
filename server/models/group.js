
var randomstring = require('randomstring');

module.exports = function (sequelize, Sequelize) {
  return sequelize.define('group', {
    name: {
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    inviteCode: {
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    }
  });
};