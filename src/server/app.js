/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 8001;
var four0four = require('./utils/404')();

var environment = process.env.NODE_ENV;
var passport = require('passport');

var cors = require('cors'); //cal per a signin fb
// var dotenv = require('dotenv');
// dotenv.load({ path: './src/server/.env' });

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors()); //cal per a signin fb

// app.use('/api', require('./routes'));
require('./contact/contact.router.js')(app);
require('./config/passport.js')(passport);
require('./users/users.router.js')(app);
require('./locate/routes/events_routes')(app);

//////////// SIGNIN FB //////////////////
/*const session = require('express-session');
//const passport = require('passport');
const passportConfig = require('./config/passport');
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'yomogantestfacebookjohnpapa',
}));*/
app.use(passport.initialize());
app.use(passport.session());

/*app.get('/auth/facebook',
  function (req, res, next) {
    var redirect = encodeURIComponent(req.query.redirect || '/');
    passport.authenticate('facebook', {
      scope: ['email'],
      callbackURL: 'http://whoplaystonight.com/auth/facebook/callback?redirect=' + redirect
    })(req, res, next);
  });

app.get('/auth/facebook/callback',
  function (req, res, next) {
    var url = 'http://whoplaystonight.com/auth/facebook/callback?redirect=' + encodeURIComponent(req.query.redirect);
    passport.authenticate('facebook', { callbackURL: url })(req, res, next);
  },
  function (req, res) {
    //res.redirect(req.query.redirect);
    console.log(req.user);
    res.send(req.user);
  });
*/
/////////////// END SIGNIN FB ///////////////

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

switch (environment) {
  case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function (req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./build/index.html'));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./tmp'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function (req, res, next) {
      four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./src/client/index.html'));
    break;
}

app.listen(port, function () {
  console.log('Express server listening on port ' + port);
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd());
});
