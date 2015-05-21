'use strict';
import Immutable from 'immutable';
import React from 'react';
import request from 'superagent';
import Loading from './loading';

export default class extends React.Component {
  componentWillMount() {
    this.setState({ loading: true });

    request.get('/api/phonenumbers')
      .end((err, res) => {
        if (err) {
          throw err;
        }
        this.setState({
          loading: false,
          numbers: Immutable.fromJS(res.body.numbers)
        });
      });
  }

  onActiveNumberChange(e) {
    this.setState({
      numbers: this.state.numbers.map(n =>
        n.set('active', n.get('number') === e.target.value)
      )
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

    const activeNumber = this.state.numbers.find(n => n.get('active'));
    if (!activeNumber) {
      throw new Error('Need to select number');
    }
    request.put('/api/activephonenumber')
      .set('content-type', 'application/json')
      .send({ number: activeNumber.get('number') })
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
            {this.state.numbers.map(number =>
              <div className="radio" key={number.get('number')}>
                <label>
                  <input checked={number.get('active')} name="phone-number"
                    onChange={this.onActiveNumberChange.bind(this)}
                    type="radio" value={number.get('number')} />
                  {number.get('name')}: {number.get('number')}
                </label>
              </div>
            )}
            <button type="submit">Save</button> <button onClick={this.onLogout}>Logout</button>
          </form>
        )}
      </div>
    );
  }
}
