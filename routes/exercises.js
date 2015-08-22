var express = require('express');
var router = express.Router();

/* GET exercise from id. */
router.get('/:id', function(req, res, next) {
  res.send('GET exercise from id');
});

/* POST exercise code. */
router.post('/:id', function(req, res, next) {
  res.send('POST exercise code');
});

module.exports = router;
