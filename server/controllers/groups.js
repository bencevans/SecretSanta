module.exports.list = function(req, res) {
  res.send('LIST GROUPS');
};

module.exports.create = function (req, res) {
  res.send('CREATE GROUP');
};

module.exports.show = function(req, res) {
  res.send('SHOW GROUP: ' + req.params.group);
};