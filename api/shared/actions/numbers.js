'use strict';
import { Actions } from 'flummox';
import Immutable from 'immutable';
import request from 'superagent';

export default class extends Actions {
  dismissAlert() {
    return true;
  }

  queryNumbers() {
    return new Promise((resolve, reject) => {
      request.get('/api/phonenumbers')
        .end((err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(Immutable.fromJS(res.body.numbers));
          }
        });
    });
  }

  updateNumber(number) {
    return new Promise((resolve, reject) => {
      request.put('/api/activephonenumber')
        .set('content-type', 'application/json')
        .send({ number })
        .end(err => {
          if (err) {
            reject(err);
          } else {
            resolve(number);
          }
        });
    });
  }
}
