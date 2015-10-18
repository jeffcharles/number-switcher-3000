#!/usr/bin/env node
'use strict';

const portfinder = require('portfinder');

portfinder.getPort((err, port) => {
  if (err) {
    console.error(err);
    process.exit(1); // eslint-disable-line no-process-exit
  }
  console.log(port);
});
