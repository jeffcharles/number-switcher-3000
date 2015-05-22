'use strict';
import { Flux } from 'flummox';
import authActions from './../api/shared/actions/auth';
import actionsStore from './../api/shared/stores/actions';
import numbersActions from './../api/shared/actions/numbers';
import numbersStore from './../api/shared/stores/numbers';

export default class extends Flux {
  constructor() {
    super();

    this.createActions('auth', authActions);
    this.createStore('actions', actionsStore, this);
    this.createActions('numbers', numbersActions);
    this.createStore('numbers', numbersStore, this);
  }
}
