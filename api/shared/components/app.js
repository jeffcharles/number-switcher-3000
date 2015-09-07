'use strict';
import React from 'react';
import { connect } from 'react-redux';
import Loading from './loading';
import Login from './login';
import NumberPicker from './number-picker';
import { queryActions } from './../actions/auth';

class App extends React.Component {
  componentDidMount() {
    if (this.props.actions.isEmpty()) {
      this.props.dispatch(queryActions());
    }
  }

  render() {
    let page;
    if (this.props.actions.isEmpty()) {
      page = <Loading />;
    } else if (this.props.actions.includes('login')) {
      page = <Login />;
    } else if (this.props.actions.includes('phonenumbers')) {
      page = <NumberPicker />;
    } else {
      throw new Error('Unknown set of actions');
    }
    return page;
  }
}

export default connect(state => ({ actions: state.auth.get('actions') }))(App);
