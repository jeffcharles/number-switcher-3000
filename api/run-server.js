'use strict';
import conf from './conf';
import server from './server';

server.listen(conf.get('port'), () => {
  console.log('Listening on port ' + conf.get('port'));
});
