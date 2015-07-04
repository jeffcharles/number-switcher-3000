'use strict';
import Immutable from 'immutable';
import NumbersStore from './../shared/stores/numbers';
import { getNumbers } from './../utils';

export default function(req) {
  var numbersPromise =
    req.authenticated ? getNumbers() : Promise.resolve(Immutable.fromJS([]));
  return numbersPromise.then(numbers => {
    return class extends NumbersStore {
      constructor(flux) {
        super(flux);
        this.state = { numbers };
      }
    };
  });
}
