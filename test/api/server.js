'use strict';
import request from 'supertest-as-promised';
import app from './../../api/server';
import { login } from './helpers';

describe('server', () => {
  describe('/', () => {
    it('should return 200 when not logged in', () =>
      request(app).get('/')
        .expect(200)
        .expect('content-type', /html/)
    );

    it('should return 200 when logged in', () => {
      const agent = request.agent(app);
      return login(agent).then(() =>
        agent.get('/')
          .expect(200)
          .expect('content-type', /html/)
      );
    });
  });
});
