'use strict';
import bodyParser from 'body-parser';
import express from 'express';
import conf from './conf';
import { getActions, getNumbers, s3 } from './utils';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ 'actions': getActions(req) });
});

router.post('/login', bodyParser.json(), (req, res) => {
  if (req.body.loginToken === conf.login_token) {
    res.cookie('user', { id: conf.user_id }, { httpOnly: true });
    res.sendStatus(204);
  } else {
    res.sendStatus(401);
  }
});

router.use((req, res, next) => {
  if (!req.authenticated) {
    res.sendStatus(401);
    return;
  }
  next();
});

router.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.sendStatus(204);
});

router.put('/activephonenumber', bodyParser.json(), (req, res, next) => {
  if (
    !req.body.number || (
      req.body.number !== conf.jeffs_number &&
      req.body.number !== conf.brennens_number
    )
  ) {
    res.sendStatus(400);
    return;
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>
    <Response><Dial>${req.body.number}</Dial></Response>`;
  s3.putObject({
    Bucket: conf.aws_s3_bucket,
    Key: 'number.xml',
    ACL: 'public-read',
    Body: xml,
    ContentType: 'application/xml'
  }, err => {
    if (err) {
      next(err);
      return;
    }
    res.sendStatus(204);
  });
});

router.get('/phonenumbers', (req, res, next) => {
  getNumbers()
    .then(numbers => {
      res.json({ numbers });
    }).catch(next);
});

export default router;
