'use strict';
import AWS from 'aws-sdk';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import exphbs from 'express-handlebars';
import express from 'express';
import Immutable from 'immutable';
import React from 'react';
import { Provider } from 'react-redux';
import App from './shared/components/app';
import createStore from './shared/store';
import conf from './conf';
import { getActions, getNumbers } from './utils';

AWS.config.apiVersions = { s3: '2006-03-01' };
AWS.config.update({ region: conf.aws_region });

import routes from './routes';

const app = express();
app.engine('handlebars', exphbs({ defaultLayout: null }));
app.set('view engine', 'handlebars');

app.use(cookieParser());
app.use((req, res, next) => {
  req.authenticated = req.cookies.user && req.cookies.user.id === conf.user_id;
  next();
});

app.use(compression());

app.use('/api', routes);
app.use(express.static('public'));
app.use('/', (req, res, next) => {
  const actions = getActions(req);
  const numbersPromise = req.authenticated ? getNumbers() : Promise.resolve([]);
  numbersPromise.then(numbers => {
    const appState = {
      auth: Immutable.fromJS({ actions }),
      numbers: Immutable.fromJS({ numbers })
    };
    const store = createStore(appState);
    const appString = React.renderToString(
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
    res.render('index', { appString, appState: JSON.stringify(appState) });
  }).catch(next);
});

export default app;
