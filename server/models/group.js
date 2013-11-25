
module.exports = function (sequelize, Sequelize) {
  return sequelize.define('group', {
    name: {
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    }
  });
};