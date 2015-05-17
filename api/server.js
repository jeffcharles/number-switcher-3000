var cookieParser = require('cookie-parser'),
  express = require('express'),
  conf = require('./conf'),
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
