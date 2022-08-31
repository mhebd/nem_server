const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		format.prettyPrint(),
		format.colorize({ all: true })
	),
	transports: [
		new transports.Console(),
		new transports.File({ filename: './log/logger-log.log' }),
	],
});
