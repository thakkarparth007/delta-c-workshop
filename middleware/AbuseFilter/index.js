/*
	Filename: AbuseFilter.js
	Description:
		Filters off and bans the users that make abusive requests to the server

	NOTE: We're not using Mongoose here. Using the vinalla MongoDB driver 
		  to avoid the overhead of mongoose.

	Configuration:
		host
		port
		username
		password
		proxy
		ABUSE_DEFINITION	(number of requests per minute above which the IP gets marked abusive)
*/

var config = require('../../config');
var logger = require('../../logger');

// db related variables
var MongoClient = require('mongodb').MongoClient;
var db = null;
var hitcounts = null;
var blocked_users = null;

// option variables
var db_name = config.abuse_filter.db_name;
var hitcounts_name = "hitcounts";
var blocked_users_name = "blocked";

// config variables
var isProxied = config.is_proxied;
var ABUSE_DEFINITION = config.abuse_filter.ABUSE_DEFINITION;
var TRAY_AGAIN_TIME = config.database.TRAY_AGAIN_TIME;
var EXPIRE_AFTER_SECONDS = config.abuse_filter.EXPIRE_AFTER_SECONDS;
var BLOCK_TIME = config.abuse_filter.BLOCK_TIME;

function prettify_date(bl_time) {
	return Math.ceil(bl_time / 60000) + " minutes";
}

function init(config) {
	logger = logger.getLogger();
	var url = "mongodb://";
	if(config.database.username && config.database.password)
		url += config.database.username + ":" + config.database.password + '@';
	url += config.database.host;
	url += ":" + config.database.port;
	url += "/" + db_name;

	MongoClient.connect(url, function(err, d) {
		if(err) {
			logger.error("AbuseFilter:ConnectionError", err);
			return;
		}
		logger.info("AbuseFilter: Database Connection Established");
		db = d;
		hitcounts = db.collection(hitcounts_name);
		hitcounts.createIndex( { "connectionTime": 1 }, { expireAfterSeconds: EXPIRE_AFTER_SECONDS }, function() {} );

		blocked_users = db.collection(blocked_users_name);
		blocked_users.createIndex( { "blockTime": 1 }, { expireAfterSeconds: BLOCK_TIME }, function() {} );
	});
}

function check_abuse(ip, cb) {
	// if the db is connected - behave normally
	// otherwise, setTimeout in a while (this is important only for the initial part)
	if(!hitcounts) {
		setTimeout(function() {
			check_abuse(ip, cb);
		},TRAY_AGAIN_TIME);
		return;
	}
	// replace check_abuse with the following function once the db is connected
	// this is to avoid unnecessary if(!hitcount) checks
	check_abuse = real_check_abuse;
	real_check_abuse(ip, cb);
}

function real_check_abuse(ip, cb) {
	insert_ip(ip, function(err, result) {
		get_block_report(ip, function(err, blockReport) {
			if(err)
				cb(err);
			else if(blockReport.isBlocked)
				cb(null, { isAbusive: true, blockTime: blockReport.blockTimeLeft });
			else
				check_unblocked_user(ip, cb);
		});
	});
}

function insert_ip(ip, cb) {
	hitcounts.insert({
		ipAddr: ip,
		connectionTime: Date.now()
	}, cb);
}

function get_block_report(ip, cb) {
	blocked_users.findOne({ ipAddr: ip }, function(err, doc) {
		if(err)
			cb(err);
		if(doc) {
			var time_left = BLOCK_TIME - (new Date() - doc.blockTime);
			logger.debug("%s : still %f seconds left", ip, time_left / 1000);
			if(time_left > 0)
				cb(null, { isBlocked: true, blockTimeLeft: BLOCK_TIME - (new Date() - doc.blockTime) });
			else {
				blocked_users.remove({ ipAddr: ip }, function(err) {
					if(err)
						logger.error("AbuseFilter:Error - Could not remove the blocked IP.");
				});
				cb(null, { isBlocked: false });
			}
		}
		else
			cb(null, { isBlocked: false });
	});
}

function check_unblocked_user(ip, cb) {
	var query = { 
		ipAddr: ip,
		connectionTime: { $gt: (new Date() - 60 * 1000) } 	// records in the last one minute
	};

	hitcounts.count(query, function(err, count) {
		if(err)
			cb(err);
		logger.debug("%s : %d", ip, count);
		if(count > ABUSE_DEFINITION)
			block_user(ip, cb);
		else
			cb(null, { isAbusive: false });
	});
}

function block_user(ip, cb) {
	blocked_users.insert({ ipAddr: ip, blockTime: new Date() }, function(err, result) {
		if(err)
			cb(err);
		else
			cb(null, { isAbusive: true, blockTime: BLOCK_TIME });
	});
}

function handleRequest(req, res, next) {
	var ip = req.connection.remoteAddress;
	if(isProxied)
		ip = req.headers['x-forwarded-for'];

	check_abuse(ip, function(err, abuseReport) {
		if(err) { 
			logger.error("AbuseFilter:Error", err); 
			res.render('error', {
				message: 'Internal Server Error',
				error: {}
			});
			return;
		}

		if(abuseReport.isAbusive) {
			res.render('error', {
				message: 'We have noticed a bad behaviour from your IP. You have been blocked for ' + prettify_date(abuseReport.blockTime),
				error: {}
			});
			return;
		}

		else {
			next();
		}
	});
}

module.exports = {
	init: init,
	handleRequest: handleRequest
};