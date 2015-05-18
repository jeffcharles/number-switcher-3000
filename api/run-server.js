var conf = require('./conf'),
  server = require('./server');

server.listen(conf.port, function() {
  console.log('Listening on port ' + conf.port);
});
