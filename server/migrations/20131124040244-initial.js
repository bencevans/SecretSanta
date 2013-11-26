module.exports = {
  up: function(migration, DataTypes, done) {

    migration.createTable('users', {
      id              : {
        type          : 'SERIAL',
        primaryKey    : true,
      },
      facebookId: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    }).complete(done);

  },
  down: function(migration, DataTypes, done) {

    migration.dropTable('users').complete(done);

  }
};
