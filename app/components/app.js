import _ from 'lodash';
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

        if (_.includes(res.body.actions, 'login')) {
          this.setState({loading: false, needToLogin: true});
        } else if (_.includes(res.body.actions, 'phonenumbers')) {
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
