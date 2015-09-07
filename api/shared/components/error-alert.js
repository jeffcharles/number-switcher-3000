'use strict';
import Alert from 'react-bootstrap/lib/Alert';
import React from 'react';

export default class ErrorAlert extends React.Component {
  render() {
    return (
      <Alert
        bsStyle="danger"
        onDismiss={this.props.onDismiss}>
        {this.props.error.message || this.props.error}
      </Alert>
    );
  }
}
