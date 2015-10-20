#!/usr/bin/env node
'use strict';

const childProcess = require('child_process');
const portfinder = require('portfinder');
const selenium = require('selenium-standalone');

let port;
let seleniumProc;
let appServerProc;
let testExitCode;
new Promise((resolve, reject) => {
  selenium.start((err, childProc) => {
    if (err) {
      reject(err);
      return;
    }
    seleniumProc = childProc;
    resolve();
  });
})
  .then(() => new Promise((resolve, reject) => {
    portfinder.getPort((err, assignedPort) => {
      if (err) {
        reject(err);
        return;
      }
      port = assignedPort;
      resolve();
    });
  }))
  .then(() => new Promise(resolve => {
    const env = process.env; // eslint-disable-line no-process-env
    env.number_switcher_3000_port = port; // eslint-disable-line camelcase
    appServerProc = childProcess.spawn('npm', ['start'], { env });
    appServerProc.stdout.once('data', resolve);
  }))
  .then(() => new Promise((resolve, reject) => {
    const env = process.env; // eslint-disable-line no-process-env
    env.number_switcher_3000_port = port; // eslint-disable-line camelcase
    const wdioProc =
      childProcess.spawn(
        'wdio',
        ['test/system/wdio.conf.js'],
        { env, stdio: 'inherit' }
      );
    wdioProc.once('exit', exitCode => {
      if (!exitCode && exitCode !== 0) {
        reject(new Error('No exit code from wdio'));
        return;
      }
      testExitCode = exitCode;
      resolve();
    });
  }))
  .then(() => new Promise(resolve => {
    appServerProc.kill();
    appServerProc.once('exit', resolve);
  }))
  .then(() => new Promise(resolve => {
    seleniumProc.kill();
    seleniumProc.once('exit', resolve);
  }))
  .then(() => {
    process.exit(testExitCode); // eslint-disable-line no-process-exit
  })
  .catch(err => {
    console.error(err);
    process.exit(1); // eslint-disable-line no-process-exit
  });
