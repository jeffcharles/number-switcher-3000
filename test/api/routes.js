var request = require('supertest-as-promised'),
  app = require('./../../api/server'),
  conf = require('./../../api/conf');

describe('routes', function() {
  function login(agent) {
    return agent.post('/api/login')
      .set('content-type', 'application/json')
      .send({ loginToken: conf.login_token })
      .expect(204);
  }

  describe('/', function() {
    it('should list login when not logged in', function() {
      return request(app).get('/api')
        .set('accept', 'application/json')
        .expect(200)
        .expect('content-type', /json/)
        .expect({actions: ['login']});
    });

    it('should list logout and phonenumbers when logged in', function() {
      var agent = request.agent(app);
      return login(agent).then(function() {
        return agent.get('/api')
          .set('accept', 'application/json')
          .expect(200)
          .expect('content-type', /json/)
          .expect({actions: ['logout', 'phonenumbers']});
      });
    });
  });

  describe('/logout', function() {
    it('should log the user out', function() {
      var agent = request.agent(app);
      return login(agent).then(function() {
        return agent.post('/api/logout')
          .expect(204);
      }).then(function() {
        return agent.get('/api')
          .expect(200)
          .expect('content-type', /json/)
          .expect({actions: ['login']});
      });
    });
  });

  describe('/activephonenumber', function() {
    it('should return 204 if valid', function() {
      var agent = request.agent(app);
      return login(agent).then(function() {
        return agent.put('/api/activephonenumber')
          .set('content-type', 'application/json')
          .send({ number: conf.jeffs_number })
          .expect(204);
      });
    });

    [
      { foo: 'bar' },
      { number: 'foo' },
      { number: '222-222-2224' }
    ].forEach(function(body) {
      it('should return 400 if invalid ' + JSON.stringify(body), function() {
        var agent = request.agent(app);
        return login(agent).then(function() {
          return agent.put('/api/activephonenumber')
            .set('content-type', 'application/json')
            .send(body)
            .expect(400);
        });
      });
    });

    it('should return 401 if not logged in', function() {
      return request(app).put('/api/activephonenumber')
        .set('content-type', 'application/json')
        .send({ number: conf.jeffs_number })
        .expect(401);
    });
  });

  describe('/phonenumbers', function() {
    it('should return a list of phone numbers when logged in', function() {
      var agent = request.agent(app);
      return login(agent).then(function() {
        return agent.get('/api/phonenumbers')
          .set('accept', 'application/json')
          .expect(200)
          .expect('content-type', /json/)
          .expect({
            numbers: [
              {name: 'Jeff', number: conf.jeffs_number},
              {name: 'Brennen', number: conf.brennens_number}
            ]
          });
      });
    });

    it('should 401 when not logged in', function() {
      return request(app).get('/api/phonenumbers')
        .set('accept', 'application/json')
        .expect(401);
    });
  });
});
