import React from 'react';
import request from 'superagent';

export default class extends React.Component {
  componentWillMount() {
    this.setState({ loginToken: '' });
  }

  onLogin(e) {
    e.preventDefault();

    request.post('/api/login')
      .set('content-type', 'application/json')
      .send({ loginToken: this.state.loginToken })
      .end(err => {
        if (err) {
          throw err;
        }

        location.reload();
      });
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
