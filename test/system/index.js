/* globals browser */
'use strict';
import assert from 'assert';
import conf from './../../api/conf';

describe('The web app', () => {
  it('should allow login and changing the number', () =>
    browser
      .url('/')
      .waitForExist('input#loginToken')
      .then(() => browser.setValue('input#loginToken', conf.login_token))
      .then(() => browser.submitForm('input#loginToken'))
      .then(() => browser.waitForExist('input[type="radio"]:not(:checked)', 2500))
      .then(() => browser.click('input[type="radio"]:not(:checked)'))
      .then(() => browser.click('button[type="submit"]'))
      .then(() => browser.waitForExist('.savedSuccessfully', 2500))
      .then(() => browser.log('browser'))
      .then(browserLogs => {
        const nonDebugLogs =
          browserLogs.value.filter(log => log.level !== 'DEBUG');
        if (nonDebugLogs.length) {
          console.log('Browser logs:');
        }
        nonDebugLogs.forEach(log => console.log(log));
        assert.equal(nonDebugLogs.length, 0, 'Should have no log entries');
      })
  );
});
