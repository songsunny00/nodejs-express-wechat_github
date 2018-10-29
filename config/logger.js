var log4js = require('../utils/logger');

module.exports = function (app) {
	app.use(log4js.log.connectLogger(log4js.daily, {
		level: log4js.log.levels.ALL
	}));
};