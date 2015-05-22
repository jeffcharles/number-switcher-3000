'use strict';
import { Flux } from 'flummox';
import actions from './actions';
import actionsStore from './actions-store';

export default class extends Flux {
  constructor() {
    super();

    this.createActions('actions', actions);
    this.createStore('actions', actionsStore, this);
  }
}
