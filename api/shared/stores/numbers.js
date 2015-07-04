'use strict';
import Immutable from 'immutable';
import { Store } from 'flummox';

export default class extends Store {
  constructor(flux) {
    super();
    const actionIds = flux.getActionIds('numbers');
    this.register(actionIds.queryNumbers, this.onQueryNumbers);
    this.register(actionIds.updateNumber, this.onUpdateNumber);
    this.state = { numbers: Immutable.fromJS([]) };
  }

  static deserialize(state) {
    const parsedState = JSON.parse(state);
    let deserializedState = {};
    Object.keys(parsedState).forEach(k =>
      deserializedState[k] = Immutable.fromJS(parsedState[k])
    );
    return deserializedState;
  }

  static serialize(state) {
    return JSON.stringify(state);
  }

  onQueryNumbers(numbers) {
    this.setState({ numbers });
  }

  onUpdateNumber(number) {
    this.setState({
      numbers: this.state.numbers.map(
        n => n.set('active', n.get('number') === number)
      )
    });
  }
}
