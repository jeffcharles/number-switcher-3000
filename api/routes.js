var express = require('express');

var router = express.Router();

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
