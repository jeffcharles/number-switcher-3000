'use strict';
import FluxComponent from 'flummox/component';
import React from 'react';

class Login extends React.Component {
  onLogin(e) {
    e.preventDefault();
    this.props.flux.getActions('auth').login(this.state.loginToken);
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

export default class LoginWrapper extends React.Component {
  render() {
    return <FluxComponent><Login /></FluxComponent>;
  }
}
