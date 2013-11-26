module.exports = {
  up: function(migration, DataTypes, done) {

    migration.createTable('deliveries', {
      id              : {
        type          : 'SERIAL',
        primaryKey    : true,
      },
      santaId: {
        type          : DataTypes.STRING,
        allowNull     : false
      },
      gifteeId: {
        type          : DataTypes.STRING,
        allowNull     : false
      },
      groupId: {
        type          : DataTypes.STRING,
        allowNull     : false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }).complete(done);

  },
  down: function(migration, DataTypes, done) {

    migration.dropTable('deliveries').complete(done);

  }
};
