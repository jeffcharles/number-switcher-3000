var _ = require('lodash'),
  bodyParser = require('body-parser'),
  express = require('express'),
  conf = require('./conf');

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

router.put('/activephonenumber', bodyParser.json(), function(req, res) {
  if (
    !req.body.number ||
    !_.includes(['222-222-2222', '222-222-2223'], req.body.number)
  ) {
    res.sendStatus(400);
    return;
  }
  res.sendStatus(204);
});

router.get('/phonenumbers', function(req, res) {
  res.json({
    numbers: [{
      name: 'Jeff',
      number: '222-222-2222'
    }, {
      name: 'Brennen',
      number: '222-222-2223'
    }]
  });
});

module.exports = router;
