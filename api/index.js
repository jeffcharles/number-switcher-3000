'use strict';
require('babel/register')();
var conf = require('./conf'); // eslint-disable-line no-var
var server = require('./server'); // eslint-disable-line no-var

if (require.main === module) {
  server.listen(conf.get('port'), function() { // eslint-disable-line prefer-arrow-callback
    console.log('Listening on port ' + conf.get('port')); // eslint-disable-line prefer-template
  });
}
