var express = require('express'),
  routes = require('./routes');

var app = express();

app.use('/api', routes);
app.use(express.static('public'));

module.exports = app;
