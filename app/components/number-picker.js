'use strict';
import _ from 'lodash';
import React from 'react';
import request from 'superagent';
import Loading from './loading';

export default class extends React.Component {
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

  onActiveNumberChange(e) {
    this.setState({
      numbers: this.state.numbers.map(n => {
        n.active = n.number === e.target.value;
        return n;
      })
    });
  }

  onLogout() {
    request.post('/api/logout')
      .end(err => {
        if (err) {
          throw err;
        }

        location.reload();
      });
  }

  onUpdateNumber(e) {
    e.preventDefault();

    const activeNumber = _.find(this.state.numbers, 'active').number;
    if (!activeNumber) {
      throw new Error('Need to select number');
    }
    request.put('/api/activephonenumber')
      .set('content-type', 'application/json')
      .send({ number: activeNumber })
      .end(err => {
        if (err) {
          throw err;
        }
      });
  }

  render() {
    return (
      <div>
        <h1>Pick the number</h1>
        {this.state.loading ?
          <Loading /> : (
          <form onSubmit={this.onUpdateNumber.bind(this)}>
            {this.state.numbers.map(number => {
              return (
                <div className="radio" key={number.number}>
                  <label>
                    <input checked={number.active} name="phone-number"
                      onChange={this.onActiveNumberChange.bind(this)}
                      type="radio" value={number.number} />
                    {number.name}: {number.number}
                  </label>
                </div>
              );
            })}
            <button type="submit">Save</button> <button onClick={this.onLogout}>Logout</button>
          </form>
        )}
      </div>
    );
  }
}
