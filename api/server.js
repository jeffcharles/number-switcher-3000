'use strict';
import AWS from 'aws-sdk';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import express from 'express';
import FluxComponent from 'flummox/component';
import React from 'react';
import conf from './conf';

AWS.config.apiVersions = { s3: '2006-03-01' };
AWS.config.update({ region: conf.aws_region });

import App from './shared/components/app';
import Flux from './flux';
import routes from './routes';

const app = express();
app.engine('handlebars', exphbs({defaultLayout: null}));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use((req, res, next) => {
  req.authenticated =
    req.cookies.user && req.cookies.user.id === conf.get('user_id');
  next();
});

app.use('/api', routes);
app.use(express.static('public'));
app.use('/', (req, res, next) => {
  Flux.create(req).then(flux => {
    const appString = React.renderToString(
      <FluxComponent flux={flux}>
        <App />
      </FluxComponent>
    );
    const appState = flux.serialize();
    res.render('index', { appString, appState });
  })
  .catch(next);
});

export default app;
