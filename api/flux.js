'use strict';
import { Flux } from 'flummox';
import authActions from './shared/actions/auth';
import actionsStoreFactory from './storeFactories/actions';
import numbersActions from './shared/actions/numbers';
import numbersStoreFactory from './storeFactories/numbers';

export default class AppFlux extends Flux {
  constructor(actionsStore, numbersStore) {
    super();

    this.createActions('auth', authActions);
    this.createStore('actions', actionsStore, this);
    this.createActions('numbers', numbersActions);
    this.createStore('numbers', numbersStore, this);
  }

  static create(req) {
    return Promise.all([actionsStoreFactory(req), numbersStoreFactory(req)])
      .then(values => {
        return new AppFlux(values[0], values[1]);
      });
  }
}
