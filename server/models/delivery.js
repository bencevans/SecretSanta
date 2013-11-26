
module.exports = function (sequelize, Sequelize) {
  return sequelize.define('delivery', {
    santaId: {
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    gifteeId: {
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    },
    groupId: {
      type: Sequelize.STRING,
      validate: {
        notNull: true
      }
    }
  }, {
    tableName: 'deliveries'
  });
};