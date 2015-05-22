'use strict';
import FluxComponent from 'flummox/component';
import React from 'react';
import Loading from './loading';
import Login from './login';
import NumberPicker from './number-picker';

export default class extends React.Component {
  componentWillMount() {
    this.props.flux.getActions('actions').queryActions();
  }

  render() {
    let page;
    if (this.props.actions.isEmpty()) {
      page = <Loading />;
    } else if (this.props.actions.includes('login')) {
      page = <FluxComponent><Login /></FluxComponent>;
    } else if (this.props.actions.includes('phonenumbers')) {
      page = <FluxComponent><NumberPicker /></FluxComponent>;
    } else {
      throw new Error('Unknown set of actions');
    }
    return page;
  }
}
