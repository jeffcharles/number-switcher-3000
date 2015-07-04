'use strict';
import FluxComponent from 'flummox/component';
import React from 'react';
import Loading from './loading';
import Login from './login';
import NumberPicker from './number-picker';

class App extends React.Component {
  componentDidMount() {
    if (this.props.actions.isEmpty()) {
      this.props.flux.getActions('actions').queryActions();
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

export default class AppWrapper extends React.Component {
  render() {
    return <FluxComponent connectToStores="actions"><App /></FluxComponent>;
  }
}
