const jwt = require('jsonwebtoken');
const errMsg = require('../util/errMsg');

exports.private = async (req, res, next) => {
	const token = req.headers['x-auth-token'];

	// Chack has token
	if(!token) {
		return next(new errMsg('Your are not authorized to access this page', 401));
	}

	const decode = await jwt.verify(token, process.env.SECRET);

	// Chack has token valid
	if(!decode) {
		return next(new errMsg('Your are not authorized to access this page', 401));
	}

	// Set user in request obj
	req.user = decode;
	next();
};


exports.limited = type => (req, res, next) => {
	if(req.user.type === type) {
		next();
	} else {
		return next(new errMsg('You have no permission to access this page.', 401));
	}
}