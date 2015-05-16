require('./index.less');

import request from 'superagent';
import React from 'react';

class NumberPicker extends React.Component {
  componentWillMount() {
    this.setState({loading: true});

    const self = this;
    request.get('/phonenumbers')
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        let state = res.body;
        state.loading = false;
        self.setState(state);
      });
  }

  render() {
    return (
      <div>
        <h1>Pick the number</h1>
        {this.state.loading ?
          <span>Loading...</span> : (
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

React.render(<NumberPicker />, document.getElementById('mount'));
