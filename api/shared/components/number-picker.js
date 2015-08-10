'use strict';
import { Alert } from 'react-bootstrap';
import FluxComponent from 'flummox/component';
import React from 'react';
import Loading from './loading';

class NumberPicker extends React.Component {
  componentWillMount() {
    this.setState({});
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.numbers.isEmpty()) {
        this.props.flux.getActions('numbers').queryNumbers();
      }
    }, 0);
  }

  onActiveNumberChange(e) {
    this.setState({ activeNumber: e.target.value });
  }

  onLogout() {
    this.props.flux.getActions('auth').logout();
  }

  onUpdateNumber(e) {
    e.preventDefault();

    const defaultActiveNumber = this.props.numbers.find(n => n.get('active'));
    const activeNumber =
      this.state.activeNumber ||
      (defaultActiveNumber && defaultActiveNumber.number);
    if (!activeNumber) {
      throw new Error('Need to select number');
    }
    this.props.flux.getActions('numbers').updateNumber(activeNumber);
  }

  render() {
    let savedSuccessfully;
    if (this.props.saved) {
      savedSuccessfully = (
        <Alert
          bsStyle="success"
          dismissAfter={2000}
          onDismiss={this.props.flux.getActions('numbers').dismissAlert}>
          Saved successfully
        </Alert>
      );
    }
    let saveError;
    if (this.props.saveError) {
      saveError = (
        <Alert
          bsStyle="danger"
          onDismiss={this.props.flux.getActions('numbers').dismissAlert}>
          {this.props.saveError.message || this.props.saveError}
        </Alert>
      );
    }
    return (
      <div>
        <h1>Pick the number</h1>
        {savedSuccessfully}
        {saveError}
        {this.props.numbers.isEmpty() ?
          <Loading /> : (
          <form onSubmit={this.onUpdateNumber.bind(this)}>
            {this.props.numbers.map(number =>
              <div className="radio" key={number.get('number')}>
                <label>
                  <input
                    checked={(this.state.activeNumber === number.get('number')) || (!this.state.activeNumber && number.get('active'))}
                    name="phone-number"
                    onChange={this.onActiveNumberChange.bind(this)}
                    type="radio" value={number.get('number')} />
                  {number.get('name')}: {number.get('number')}
                </label>
              </div>
            )}
            <button disabled={this.props.isSaving} type="submit">{this.props.isSaving ? 'Saving' : 'Save'}</button> <button onClick={this.onLogout.bind(this)} type="button">Logout</button>
          </form>
        )}
      </div>
    );
  }
}

export default class NumberPickerWrapper extends React.Component {
  render() {
    return (
      <FluxComponent connectToStores="numbers"><NumberPicker /></FluxComponent>
    );
  }
}
