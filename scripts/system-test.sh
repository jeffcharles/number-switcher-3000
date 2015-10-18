#!/usr/bin/env bash

# Don't stop on errors so don't set -e
set -uo pipefail

(selenium-standalone start)&
SELENIUM_PID=$!
APP_PORT=$(scripts/port.js)
(number_switcher_3000_port=$APP_PORT node api/index.js)&
APP_PID=$!
sleep 1 # Wait for Selenium to start

number_switcher_3000_port=$APP_PORT wdio test/system/wdio.conf.js
TEST_EXIT=$?

kill $APP_PID
wait $APP_PID

kill $SELENIUM_PID
wait $SELENIUM_PID

exit $TEST_EXIT
