var express = require('express');

module.exports = function(req,res,next) {
	if(!req.session.isloggedin) {
		res.redirect('/login');
	}
	else {
		next();
	}
};
