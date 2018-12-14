var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users/cool listing. */
router.get('/cool', function(req, res, next) {
	res.send('You love pugs pug-lover');
});

router.get('/cool/kris', function(req, res, next) {
	res.send('You figured it out');
});


module.exports = router;
