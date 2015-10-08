/* global appState */
'use strict';
require('./index.less');

import Immutable from 'immutable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './../api/shared/components/app';
import createStore from './../api/shared/store';

const store = createStore({
  auth: Immutable.fromJS(appState.auth),
  numbers: Immutable.fromJS(appState.numbers)
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('mount')
);
