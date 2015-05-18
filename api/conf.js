var rc = require('rc');

/*eslint-disable camelcase */

module.exports = rc('number_switcher_3000', {
  aws_region: 'us-east-1',
  aws_s3_bucket: 'number-switcher-3000-dev',
  brennens_number: '222-222-2223',
  jeffs_number: '222-222-2222',
  login_token: 'login_token',
  port: '3000',
  user_id: 'user_id'
});

/*eslint-enable camelcase */
