'use strict';
import AWS from 'aws-sdk';
import conf from './conf';

AWS.config.apiVersions = { s3: '2006-03-01' };
AWS.config.update({ region: conf.aws_region });

import cookieParser from 'cookie-parser';
import express from 'express';
import routes from './routes';

const app = express();

app.use(
  '/api',
  cookieParser(),
  (req, res, next) => {
    req.authenticated =
      req.cookies.user && req.cookies.user.id === conf.get('user_id');
    next();
  },
  routes
);
app.use(express.static('public'));

export default app;
