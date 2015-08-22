module.exports = 
{
	"is_proxied": false,			// is the server behind a proxy?
	"env": "dev",					// what is the environment? production or development?
	"log": console.log,				// what log function should be used?

	"host": "localhost",
	"port": 3000,

	"BCRYPT_ROUNDS": 8,

	"logger": {
		"development": {
			"console": {
				"colorize": true,
				"timestamp": true,
				"prettyPrint": true,
				"level": "debug"
			},
			"file": {
				"filename": './logs/delta-c-workshop.log',
				"timestamp": true,
				"maxSize": 5242880,	// 5 MB
				"prettyPrint": true,
				"level": "debug"
			}
		},
		"production": {
			"file": {
				"filename": './logs/delta-c-workshop.log',
				"timestamp": true,
				"maxSize": 5242880,	// 5 MB
				"prettyPrint": true,
				"level": "debug"
			}
		}
	},

	// database credentials.
	"database": {
		"db_name": "delta-c-workshop",
		"host": "localhost",
		"port": 27017,
		"username": "",
		"password": "",

		"TRY_AGAIN_TIME": 1000		// wait for 1000ms before retrying to connect to the db.
	},
	"abuse_filter": {
		"ABUSE_DEFINITION": 150,	// number of requests allowed per minute. Above this, you're abusive.
		"EXPIRE_AFTER_SECONDS": 60,	// number of seconds for which mongodb stores the ip-records,
		"BLOCK_TIME": 900000,		// block a bad guy for 15 minutes. (15*60*1000ms)

		"db_name": "delta-c-workshop-abuse-filter"
	}
};