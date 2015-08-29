'use strict';
import Immutable from 'immutable';
import { Store } from 'flummox';

export default class extends Store {
  constructor(flux) {
    super();
    const actionIds = flux.getActionIds('numbers');
    this.register(actionIds.dismissAlert, this.onDismissAlert);
    this.register(actionIds.queryNumbers, this.onQueryNumbers);
    this.registerAsync(
      actionIds.updateNumber,
      this.onUpdateNumberStarted,
      this.onUpdateNumberSuccess,
      this.onUpdateNumberFailed
    );
    this.state = { numbers: Immutable.fromJS([]) };
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

  onDismissAlert() {
    this.setState({
      saveError: null,
      saved: null
    });
  }

  onQueryNumbers(numbers) {
    this.setState({ numbers });
  }

  onUpdateNumberFailed(err) {
    this.setState({
      isSaving: false,
      saveError: err,
      saved: false
    });
  }

  onUpdateNumberStarted() {
    this.setState({ isSaving: true });
  }

  onUpdateNumberSuccess(number) {
    this.setState({
      isSaving: false,
      numbers: this.state.numbers.map(
        n => n.set('active', n.get('number') === number)
      ),
      saved: true
    });
  }
}
