'use strict';
require('babel-register');
var conf = require('./conf'); // eslint-disable-line no-var
var server = require('./server').default; // eslint-disable-line no-var

if (require.main === module) {
  server.listen(conf.port, function() { // eslint-disable-line prefer-arrow-callback
    console.log('Listening on port ' + conf.port); // eslint-disable-line prefer-template
  });
}
