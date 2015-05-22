'use strict';
import ActionsStore from './../shared/stores/actions';
import { getActions } from './../utils';

export default function(req) {
  return class extends ActionsStore {
    constructor(flux) {
      super(flux);
      this.state = { actions: getActions(req) };
    }
  };
}
