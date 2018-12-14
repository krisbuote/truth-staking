// live stakes route
var express = require('express');
var router = express.Router();
var path = require('path');

// live-stakes page
router.get('/live', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/html/stakes-live.html'));
})

// past-stakes page
router.get('/history', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/html/stakes-history.html'));
})

module.exports = router;