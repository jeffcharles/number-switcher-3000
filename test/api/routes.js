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

    it('should list phonenumbers when logged in', function() {
      var agent = request.agent(app);
      return login(agent).then(function() {
        return agent.get('/api')
          .set('accept', 'application/json')
          .expect(200)
          .expect('content-type', /json/)
          .expect({actions: ['phonenumbers']});
      });
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
              {name: 'Jeff', number: '222-222-2222'},
              {name: 'Brennen', number: '222-222-2223'}
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
