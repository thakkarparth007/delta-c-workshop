var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/', function(req, res, next) {
	fs.readdir('./lessons/', function(err, files) {
		if(err) {
			console.log(err);
			res.status(500).end();
		}
		else {
			res.render('dashboard', { lessons: files.map(x => x.substr(0,x.length-5)).join(",") });
		}
	});
});

module.exports = router;
