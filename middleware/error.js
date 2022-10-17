const { Result } = require('../utility');
const logger = require('./logger');

module.exports = (err, req, res, next) => {
	err ? console.log(err) : null;
	let message = err.message || 'SERVER ERROR';
	let status = err.status || 500;

	if (err.code === 11000) {
		const field = Object.keys(err.keyValue)[0];
		message = `Duplicate key found on field "${field}" and value "${err.keyValue[field]}" `;
	}

	if (err.name == 'ValidationError') {
		const keys = Object.keys(err.errors);
		let errmsg = [];
		keys.forEach((key) => {
			errmsg.push(err.errors[key].message);
		});
		message = errmsg.join('& ');
	}

	const EUID = Math.floor(Math.random() * Date.now() * 23).toString(16);
	err.EUID = EUID;

	const meta = {
		path: req.path,
		method: req.method,
		EUID,
		status,
	};

	logger.error({ message, meta });

	res.status(status).json(new Result(false, message, { err }));
	next();
};
