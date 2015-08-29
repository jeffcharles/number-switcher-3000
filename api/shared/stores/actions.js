'use strict';
import Immutable from 'immutable';
import { Store } from 'flummox';

export default class extends Store {
  constructor(flux) {
    super();
    const actionIds = flux.getActionIds('auth');
    this.register(actionIds.login, this.onActionsChange);
    this.register(actionIds.logout, this.onActionsChange);
    this.state = { actions: Immutable.fromJS([]) };
  }

  static deserialize(state) {
    const parsedState = JSON.parse(state);
    const deserializedState = {};
    Object.keys(parsedState).forEach(k =>
      deserializedState[k] = Immutable.fromJS(parsedState[k])
    );
    return deserializedState;
  }

  static serialize(state) {
    return JSON.stringify(state);
  }

  onActionsChange(actions) {
    this.setState({ actions });
  }
}
