'use strict';
import _ from 'lodash';
import AWS from 'aws-sdk';
import bodyParser from 'body-parser';
import express from 'express';
import xml2js from 'xml2js';
import conf from './conf';

const s3 = new AWS.S3();

const router = express.Router();

router.get('/', (req, res) => {
  const actions = req.authenticated ? ['logout', 'phonenumbers'] : ['login'];
  res.json({ 'actions': actions });
});

router.post('/login', bodyParser.json(), (req, res) => {
  if (req.body.loginToken === conf.login_token) {
    res.cookie('user', {id: conf.user_id}, { httpOnly: true });
    res.sendStatus(204);
  } else {
    res.sendStatus(401);
  }
});

router.use((req, res, next) => {
  if (!req.authenticated) {
    res.sendStatus(401);
  } else {
    next();
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('user');
  res.sendStatus(204);
});

router.put('/activephonenumber', bodyParser.json(), (req, res, next) => {
  if (
    !req.body.number ||
    !_.includes([conf.jeffs_number, conf.brennens_number], req.body.number)
  ) {
    res.sendStatus(400);
    return;
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?><Response><Dial>' +
    req.body.number +
    '</Dial></Response>';
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
  s3.getObject({
    Bucket: conf.aws_s3_bucket,
    Key: 'number.xml'
  }, (err, data) => {
    if (err) {
      next(err);
      return;
    }

    xml2js.parseString(data.Body, {explicitRoot: true}, (err2, result) => {
      if (err2) {
        next(err2);
        return;
      }

      const number =
        result.Response && result.Response.Dial && result.Response.Dial[0];

      res.json({
        numbers: [{
          name: 'Jeff',
          number: conf.jeffs_number,
          active: number === conf.jeffs_number
        }, {
          name: 'Brennen',
          number: conf.brennens_number,
          active: number === conf.brennens_number
        }]
      });
    });
  });
});

export default router;
