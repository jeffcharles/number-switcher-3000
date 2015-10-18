'use strict';
import Alert from 'react-bootstrap/lib/Alert';
import React from 'react';
import { connect } from 'react-redux';
import { logout } from './../actions/auth';
import { dismissAlert } from './../actions/alert';
import { queryNumbers, updateNumber } from './../actions/numbers';
import ErrorAlert from './error-alert';
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

  getErrorAlert(err) {
    let alert;
    if (err) {
      alert = (
        <ErrorAlert
          error={err}
          onDismiss={() => this.props.dispatch(dismissAlert())} />
      );
    }
    return alert;
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
        <div className="savedSuccessfully">
          <Alert
            bsStyle="success"
            dismissAfter={2000}
            onDismiss={() => this.props.dispatch(dismissAlert())}>
            Saved successfully
          </Alert>
        </div>
      );
    }
    return (
      <div>
        <h1>Pick the number</h1>
        {savedSuccessfully}
        {this.getErrorAlert(this.props.authError)}
        {this.getErrorAlert(this.props.numberError)}
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
            <button disabled={this.props.isSaving} type="submit">{this.props.isSaving ? 'Saving' : 'Save'}</button> <button disabled={this.props.isLoggingOut} onClick={this.onLogout.bind(this)} type="button">{this.props.isLoggingOut ? 'Logging out' : 'Logout'}</button>
          </form>
        )}
      </div>
    );
  }
}

export default connect(state => ({
  authError: state.auth.get('error'),
  isLoggingOut: state.auth.get('isLoggingOut'),
  numbers: state.numbers.get('numbers'),
  isSaving: state.numbers.get('isSaving'),
  saved: state.numbers.get('saved'),
  numberError: state.numbers.get('error')
}))(NumberPicker);
