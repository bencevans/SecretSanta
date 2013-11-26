
module.exports = function (sequelize, Sequelize) {
  return sequelize.define('user', {
    facebookId: {
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    }
  }, {
    tableName: 'users'
  });
};