var request = require('supertest-as-promised'),
  app = require('./../../api/server');

describe('routes', function() {
  describe('/', function() {
    it('should list available routes', function() {
      return request(app).get('/api')
        .set('accept', 'application/json')
        .expect(200)
        .expect('content-type', /json/)
        .expect({actions: ['phonenumbers']});
    });
  });

  describe('/phonenumbers', function() {
    it('should return a list of phone numbers', function() {
      return request(app).get('/api/phonenumbers')
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
});
