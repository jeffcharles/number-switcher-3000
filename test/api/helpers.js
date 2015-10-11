'use strict';
import conf from './../../api/conf';

export function login(agent) {
  return agent.post('/api/login')
    .set('content-type', 'application/json')
    .send({ loginToken: conf.login_token })
    .expect(204);
}
