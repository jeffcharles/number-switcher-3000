var AWS = require('aws-sdk'),
  conf = require('./conf');

AWS.config.apiVersions = { s3: '2006-03-01' };
AWS.config.update({ region: conf.aws_region });

var cookieParser = require('cookie-parser'),
  express = require('express'),
  routes = require('./routes');

var app = express();

app.use(
  '/api',
  cookieParser(),
  function(req, res, next) {
    req.authenticated =
      req.cookies.user && req.cookies.user.id === conf.user_id;
    next();
  },
  routes
);
app.use(express.static('public'));

module.exports = app;
