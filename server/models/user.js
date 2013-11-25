
module.exports = function (sequelize, Sequelize) {
  return sequelize.define('User', {
    facebookId: {
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    }
  });
};