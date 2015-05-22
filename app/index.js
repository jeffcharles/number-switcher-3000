/* global appState */
'use strict';
require('./index.less');

import FluxComponent from 'flummox/component';
import React from 'react';
import App from './../api/shared/components/app';
import Flux from './flux';

const flux = new Flux();
flux.deserialize(JSON.stringify(appState));
React.render(
  <FluxComponent flux={flux}>
    <App />
  </FluxComponent>,
  document.getElementById('mount')
);
