'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { login } from './../actions/auth';

class Login extends React.Component {
  onLogin(e) {
    e.preventDefault();
    this.props.dispatch(login(this.state.loginToken));
  }

  onLoginTokenChange(e) {
    this.setState({ loginToken: e.target.value });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.onLogin.bind(this)}>
          <div>
            <label htmlFor="loginToken">Login token</label>
            <input id="loginToken"
              onChange={this.onLoginTokenChange.bind(this)}
              type="text" value={this.loginToken} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default connect(() => ({}))(Login);
