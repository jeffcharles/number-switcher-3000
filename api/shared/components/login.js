'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { dismissAlert } from './../actions/alert';
import { login } from './../actions/auth';
import ErrorAlert from './error-alert';

class Login extends React.Component {
  onLogin(e) {
    e.preventDefault();
    this.props.dispatch(login(this.state.loginToken));
  }

  onLoginTokenChange(e) {
    this.setState({ loginToken: e.target.value });
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <ErrorAlert
          error={this.props.error}
          onDismiss={() => this.props.dispatch(dismissAlert())} />
      );
    }
    return (
      <div>
        <h1>Login</h1>
        {error}
        <form onSubmit={this.onLogin.bind(this)}>
          <div>
            <label htmlFor="loginToken">Login token</label>
            <input id="loginToken"
              onChange={this.onLoginTokenChange.bind(this)}
              type="text" value={this.loginToken} />
          </div>
          <button disabled={this.props.isLoggingIn} type="submit">{this.props.isLoggingIn ? 'Logging In' : 'Login'}</button>
        </form>
      </div>
    );
  }
}

export default connect(state => ({
  error: state.auth.get('error'),
  isLoggingIn: state.auth.get('isLoggingIn')
}))(Login);
