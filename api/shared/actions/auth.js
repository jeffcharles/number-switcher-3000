'use strict';
import { Actions } from 'flummox';
import Immutable from 'immutable';
import request from 'superagent';

function getActions() {
  return new Promise((resolve, reject) => {
    request.get('/api')
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(Immutable.fromJS(res.body.actions));
        }
      });
  });
}

export default class extends Actions {
  login(loginToken) {
    return new Promise((resolve, reject) => {
      request.post('/api/login')
        .set('content-type', 'application/json')
        .send({ loginToken: loginToken })
        .end(err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    }).then(getActions);
  }

  logout() {
    return new Promise((resolve, reject) => {
      request.post('/api/logout')
        .end(err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    }).then(getActions);
  }
}
