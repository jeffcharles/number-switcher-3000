'use strict';
import Immutable from 'immutable';
import React from 'react';
import request from 'superagent';
import Loading from './loading';
import Login from './login';
import NumberPicker from './number-picker';

export default class extends React.Component {
  componentWillMount() {
    this.setState({loading: true});

    request.get('/api')
      .end((err, res) => {
        if (err) {
          throw err;
        }

        const actions = Immutable.fromJS(res.body.actions);
        if (actions.includes('login')) {
          this.setState({loading: false, needToLogin: true});
        } else if (actions.includes('phonenumbers')) {
          this.setState({loading: false, needToLogin: false, phonenumbers: true});
        } else {
          throw new Error('Cannot load phone numbers');
        }
      });
  }

  render() {
    let page;
    if (this.state.loading) {
      page = <Loading />;
    } else if (this.state.needToLogin) {
      page = <Login />;
    } else if (this.state.phonenumbers) {
      page = <NumberPicker />;
    }
    return page;
  }
}
