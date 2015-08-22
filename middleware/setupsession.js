/*
	exports function setupsession(req)

	Called when a user logs in for the first time.
	Useful because we'd like a user to autologin after
	registration. So, setting up the session information
	is common to signup and login routes. Hence, separating
	it out here.

	In future, we might store additional information. Hence, 
	useful to separate out this (currently trivial) code.
 */

module.exports = function(req, user, cb) {
	req.session.isloggedin = true;
	req.session.name = user.name;
	req.session.rollNumber = user.rollNumber;
	req.session.isAdmin = user.isAdmin;
	cb();
};