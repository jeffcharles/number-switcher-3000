var rc = require('rc');

/*eslint-disable camelcase */

module.exports = rc('let_me_in', {
  aws_region: 'us-east-1',
  aws_s3_bucket: 'let-me-in-dev',
  login_token: 'login_token',
  user_id: 'user_id'
});

/*eslint-enable camelcase */
