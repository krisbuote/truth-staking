// wiki route

var express = require('express');
var router = express.Router();
var path = require('path');


//home
router.get('/', function(req, res) {
	res.send('Wiki Home Page');
})


// about page
router.get('/page', function(req, res) {
	res.sendFile(path.join(__dirname, '../public/html/wiki_page.html'));
})


module.exports = router;