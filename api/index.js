'use strict';
require('babel/register')();
var conf = require('./conf');
var server = require('./server');

if (require.main === module) {
  server.listen(conf.get('port'), function() {
    console.log('Listening on port ' + conf.get('port'));
  });
}
