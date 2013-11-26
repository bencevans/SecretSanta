module.exports = {
  up: function(migration, DataTypes, done) {

    migration.createTable('groups', {
      id              : {
        type          : 'SERIAL',
        primaryKey    : true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }).complete(done);

  },
  down: function(migration, DataTypes, done) {

    migration.dropTable('groups').complete(done);

  }
};
