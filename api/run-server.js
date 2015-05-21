'use strict';
import conf from './conf';
import server from './server';

server.listen(conf.port, () => {
  console.log('Listening on port ' + conf.port);
});
