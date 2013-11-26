module.exports = {
  up: function(migration, DataTypes, done) {

    migration.addColumn('groups', 'inviteCode', DataTypes.STRING).complete(done);

  },
  down: function(migration, DataTypes, done) {

    migration.removeColumn('groups', 'inviteCode').complete(done);

  }
};