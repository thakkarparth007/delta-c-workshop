/*
	routes to handle login and logout.

	handled routes:
		get /login
		post /login 	params: username, password
		get /logout
 */

var express = require('express');
var router = express.Router();
var restrict = require('../middleware/restrict');
var db_connect = require('../db_connect');
var setupsession = require('../middleware/setupsession');
var logger = require('../logger').getLogger();

function validateLogin(name, rollNumber, cb) {
	db_connect.reuse(function(db) {
		var users = db.collection('users');

		users.findOne({
			name: name,
			rollNumber: rollNumber
		}, function(err,user) {
			if(err) {
				logger.error("Error retrieiving user details from the database.", err);
				return cb(err);
			}
			if(!user)
				return cb(null, false);

			cb(null, user);
		});
	});
}

/* login page */
router.get('/login', function(req, res) {
	if(req.session.isloggedin) {
		res.redirect('/dashboard');
		return;
	}
	res.set('Cache-Control', 'no-cache, max-age=0, must-revalidate, no-store');
	res.render('login');
});

router.post('/login', function(req, res) {
	if(req.session.isloggedin) {
		res.redirect('/dashboard');
		return;
	}
	var name = req.body.name.toString().trim(),
		rollNumber = req.body.rollNumber;

	var errorMessages = [];
	if(!name || typeof name !== "string" || !name.trim())
	{
		errorMessages.push("Name missing.");
	}
	else if(!name || typeof name !== "string" || !name.trim())
	{
		errorMessages.push("Password missing.");
	}
	else {
		validateLogin(name,rollNumber,function(err,user) {
			if(err) {
				logger.error(err);
				res.status(500).end();
			}
			else if(user) {
				setupsession(req,user,function() {
					res.redirect('/dashboard');
				});
			}
			else {
				res.render('login', {
					error: 'Invalid login credentials.'
				});
			}
		});
		return;
	}

	res.render('login', {
		error: 'Invalid login credentials.'
	});
});

router.get('/logout', restrict, function(req,res,next) {
	logger.info('LOGOUT', req.session.username, req.session.name);
	req.session.destroy();
	res.redirect('/');
	res.end();
});

module.exports = router;
