'use strict';
require('./index.less');

import FluxComponent from 'flummox/component';
import React from 'react';
import App from './components/app';
import Flux from './flux';

const flux = new Flux();
React.render(
  <FluxComponent connectToStores="actions" flux={flux}>
    <App />
  </FluxComponent>,
  document.getElementById('mount')
);
