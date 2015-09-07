'use strict';
import Alert from 'react-bootstrap/lib/Alert';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from './../actions/auth';
import { dismissAlert, queryNumbers, updateNumber } from './../actions/numbers';
import Loading from './loading';

class NumberPicker extends React.Component {
  componentWillMount() {
    this.setState({});
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.numbers.isEmpty()) {
        this.props.dispatch(queryNumbers());
      }
    }, 0);
  }

  onActiveNumberChange(e) {
    this.setState({ activeNumber: e.target.value });
  }

  onLogout() {
    this.props.dispatch(logout());
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
    this.props.dispatch(updateNumber(activeNumber));
  }

  render() {
    let savedSuccessfully;
    if (this.props.saved) {
      savedSuccessfully = (
        <Alert
          bsStyle="success"
          dismissAfter={2000}
          onDismiss={() => this.props.dispatch(dismissAlert())}>
          Saved successfully
        </Alert>
      );
    }
    let error;
    if (this.props.error) {
      error = (
        <Alert
          bsStyle="danger"
          onDismiss={() => this.props.dispatch(dismissAlert())}>
          {this.props.error.message || this.props.error}
        </Alert>
      );
    }
    return (
      <div>
        <h1>Pick the number</h1>
        {savedSuccessfully}
        {error}
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

export default connect(state => ({
  numbers: state.numbers.get('numbers'),
  isSaving: state.numbers.get('isSaving'),
  saved: state.numbers.get('saved'),
  error: state.numbers.get('error')
}))(NumberPicker);
