var winston = require('winston');
var config = require('./config');

/*
	Logging.
	Use the console and the file transports in development
	Use the file in production
 */

var logger = null;

exports.init = function(app) {
	if(app.get('env') === 'development') {
		logger = new winston.Logger({
			transports: [
				new winston.transports.Console(config.logger.development.console),
				new winston.transports.File(config.logger.development.file)
			]
		});
	}

	if(app.get('env') === 'production') {
		logger = new winston.Logger({
			transports: [
				new winston.transports.File(config.production.file)
			]
		});
	}
};

exports.getLogger = function() {
	return logger;
};