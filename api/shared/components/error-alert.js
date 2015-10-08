'use strict';
import Alert from 'react-bootstrap/lib/Alert';
import React from 'react';

export default ({ error, onDismiss }) =>
  <Alert bsStyle="danger" onDismiss={onDismiss}>{error.message || error}</Alert>;
