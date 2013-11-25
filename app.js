
var config     = require('./config');
var express    = require('express');
var http       = require('http');
var passport   = require('./server/auth/passport');
var RedisStore = require( "connect-redis" )(express);
var redis      = require( "redis" ).createClient();

var app = express();

app.configure('development', function() {
  app.use(express.logger('dev'));
  app.locals.pretty = true;
});

app.configure(function() {
  app.engine('jade', require('jade').__express);
  app.set('views', './server/views');
  app.set('view engine', 'jade');
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat', store: new RedisStore({ client: redis }) }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

require('./server/routes')(app);

http.createServer(app).listen(config.port, function() {
  console.log('Listening on port ' + config.port);
});
