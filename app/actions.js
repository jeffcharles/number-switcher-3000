'use strict';
import { Actions } from 'flummox';
import Immutable from 'immutable';
import request from 'superagent';

export default class extends Actions {
  queryActions() {
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
}
