'use strict';

const conf = require('./../../api/conf');

exports.config = {
  specs: [
    './test/system/index.js'
  ],
  capabilities: [{
    browserName: 'chrome'
  }],
  baseUrl: `http://localhost:${conf.port}`,
  waitForTimeout: 1000,
  framework: 'mocha',
  mochaOpts: {
    compilers: ['js:babel-register']
  },
  sync: false
};
