'use strict';
var _ = require('lodash'),
  AWS = require('aws-sdk'),
  bodyParser = require('body-parser'),
  express = require('express'),
  xml2js = require('xml2js'),
  conf = require('./conf');

var s3 = new AWS.S3();

var router = express.Router();

router.get('/', function(req, res) {
  var actions = req.authenticated ? ['logout', 'phonenumbers'] : ['login'];
  res.json({ 'actions': actions });
});

router.post('/login', bodyParser.json(), function(req, res) {
  if (req.body.loginToken === conf.login_token) {
    res.cookie('user', {id: conf.user_id}, { httpOnly: true });
    res.sendStatus(204);
  } else {
    res.sendStatus(401);
  }
});

router.use(function(req, res, next) {
  if (!req.authenticated) {
    res.sendStatus(401);
  } else {
    next();
  }
});

router.post('/logout', function(req, res) {
  res.clearCookie('user');
  res.sendStatus(204);
});

router.put('/activephonenumber', bodyParser.json(), function(req, res, next) {
  if (
    !req.body.number ||
    !_.includes([conf.jeffs_number, conf.brennens_number], req.body.number)
  ) {
    res.sendStatus(400);
    return;
  }

  var xml =
    '<?xml version="1.0" encoding="UTF-8"?><Response><Dial>' +
    req.body.number +
    '</Dial></Response>';
  s3.putObject({
    Bucket: conf.aws_s3_bucket,
    Key: 'number.xml',
    ACL: 'public-read',
    Body: xml,
    ContentType: 'application/xml'
  }, function(err) {
    if (err) {
      next(err);
      return;
    }
    res.sendStatus(204);
  });
});

router.get('/phonenumbers', function(req, res, next) {
  s3.getObject({
    Bucket: conf.aws_s3_bucket,
    Key: 'number.xml'
  }, function(err, data) {
    if (err) {
      next(err);
      return;
    }

    xml2js.parseString(data.Body, {explicitRoot: true}, function(err2, result) {
      if (err2) {
        next(err2);
        return;
      }

      var number =
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

module.exports = router;
