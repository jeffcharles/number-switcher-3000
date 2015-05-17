require('./index.less');

import _ from 'lodash';
import request from 'superagent';
import React from 'react';

class Loading extends React.Component {
  render() {
    return <span>Loading...</span>;
  }
}

class Login extends React.Component {
  componentWillMount() {
    this.setState({ loginToken: '' });
  }

  onLogin(e) {
    e.preventDefault();

    request.post('/api/auth')
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
            <input type="text" id="loginToken" value={this.loginToken}
              onChange={this.onLoginTokenChange.bind(this)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

class NumberPicker extends React.Component {
  componentWillMount() {
    this.setState({loading: true});

    request.get('/api/phonenumbers')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        let state = res.body;
        state.loading = false;
        this.setState(state);
      });
  }

  render() {
    return (
      <div>
        <h1>Pick the number</h1>
        {this.state.loading ?
          <Loading /> : (
          <form>
            {this.state.numbers.map(function(number) {
              return (
                <div className="radio" key={number.number}>
                  <label>
                    <input type="radio" name="phone-number"
                      value={number.number} />
                    {number.name}: {number.number}
                  </label>
                </div>
              );
            })}
            <button type="submit">Save</button>
          </form>
        )}
      </div>
    );
  }
}

class App extends React.Component {
  componentWillMount() {
    this.setState({loading: true});

    request.get('/api')
      .end((err, res) => {
        if (err) {
          throw err;
        }

        if (_.includes(res.body.actions, 'auth')) {
          this.setState({loading: false, needsAuth: true});
        } else if (_.includes(res.body.actions, 'phonenumbers')) {
          this.setState({loading: false, needsAuth: false, phonenumbers: true});
        } else {
          throw new Error('Cannot load phone numbers');
        }
      });
  }

  render() {
    let page;
    if (this.state.loading) {
      page = <Loading />;
    } else if (this.state.needsAuth) {
      page = <Login />;
    } else if (this.state.phonenumbers) {
      page = <NumberPicker />;
    }
    return page;
  }
}

React.render(<App />, document.getElementById('mount'));
