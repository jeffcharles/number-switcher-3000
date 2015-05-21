'use strict';
import request from 'supertest-as-promised';
import app from './../../dist/server';
import conf from './../../dist/conf';

describe('routes', () => {
  function login(agent) {
    return agent.post('/api/login')
      .set('content-type', 'application/json')
      .send({ loginToken: conf.get('login_token') })
      .expect(204);
  }

  describe('/', () => {
    it('should list login when not logged in', () =>
      request(app).get('/api')
        .set('accept', 'application/json')
        .expect(200)
        .expect('content-type', /json/)
        .expect({ actions: ['login'] })
    );

    it('should list logout and phonenumbers when logged in', () => {
      const agent = request.agent(app);
      return login(agent).then(() =>
        agent.get('/api')
          .set('accept', 'application/json')
          .expect(200)
          .expect('content-type', /json/)
          .expect({ actions: ['logout', 'phonenumbers'] })
      );
    });
  });

  describe('/logout', () => {
    it('should log the user out', () => {
      const agent = request.agent(app);
      return login(agent).then(() =>
        agent.post('/api/logout')
          .expect(204)
      ).then(() =>
        agent.get('/api')
          .expect(200)
          .expect('content-type', /json/)
          .expect({actions: ['login']})
      );
    });
  });

  describe('/activephonenumber', () => {
    it('should return 204 if valid', () => {
      const agent = request.agent(app);
      return login(agent).then(() =>
        agent.put('/api/activephonenumber')
          .set('content-type', 'application/json')
          .send({ number: conf.get('jeffs_number') })
          .expect(204)
      );
    });

    [
      { foo: 'bar' },
      { number: 'foo' },
      { number: '222-222-2224' }
    ].forEach(body => {
      it('should return 400 if invalid ' + JSON.stringify(body), () => {
        const agent = request.agent(app);
        return login(agent).then(() =>
          agent.put('/api/activephonenumber')
            .set('content-type', 'application/json')
            .send(body)
            .expect(400)
        );
      });
    });

    it('should return 401 if not logged in', () =>
      request(app).put('/api/activephonenumber')
        .set('content-type', 'application/json')
        .send({ number: conf.get('jeffs_number') })
        .expect(401)
    );
  });

  describe('/phonenumbers', () => {
    it('should return a list of phone numbers when logged in', () => {
      const agent = request.agent(app);
      return login(agent).then(() =>
        agent.get('/api/phonenumbers')
          .set('accept', 'application/json')
          .expect(200)
          .expect('content-type', /json/)
          .expect(res =>
            res.body.numbers && res.body.numbers.length === 2 &&
              res.body.numbers[0].name === 'Jeff' &&
              res.body.numbers[0].number === conf.get('jeffs_number') &&
              res.body.numbers[1].name === 'Brennen' &&
              res.body.numbers[1].number === conf.get('brennens_number')
          )
      );
    });

    it('should 401 when not logged in', () =>
      request(app).get('/api/phonenumbers')
        .set('accept', 'application/json')
        .expect(401)
    );

    it('should list which number is active', () => {
      const agent = request.agent(app);
      return login(agent).then(() =>
        agent.put('/api/activephonenumber')
          .set('content-type', 'application/json')
          .send({ number: conf.get('jeffs_number') })
          .expect(204)
      ).then(() =>
        agent.get('/api/phonenumbers')
          .set('accept', 'application/json')
          .expect(200)
          .expect(res =>
            res.body.numbers[0].number === conf.get('jeffs_number') &&
              res.body.numbers[0].active &&
              res.body.numbers[1].number !== conf.get('jeffs_number') &&
              !res.body.numbers[1].active
          )
      ).then(() =>
        agent.put('/api/activephonenumber')
          .set('content-type', 'application/json')
          .send({ number: conf.get('brennens_number') })
          .expect(204)
      ).then(() =>
        agent.get('/api/phonenumbers')
          .set('accept', 'application/json')
          .expect(200)
          .expect(res =>
            res.body.numbers[1].number === conf.get('brennens_number') &&
              res.body.numbers[1].active &&
              res.body.numbers[0].number !== conf.get('brennens_number') &&
              !res.body.numbers[0].active
          )
      );
    });
  });
});
