'use strict';
import Immutable from 'immutable';
import { Store } from 'flummox';

export default class extends Store {
  constructor(flux) {
    super();
    const actionIds = flux.getActionIds('actions');
    this.register(actionIds.queryActions, this.onQueryActions);
    this.state = { actions: Immutable.fromJS([]) };
  }

  onQueryActions(actions) {
    this.setState({ actions });
  }
}
