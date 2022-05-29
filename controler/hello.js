// const Model = require('../model/test');
const asyncHdl = require('../util/asyncHdl');
const errMsg = require('../util/errMsg');


/**
	=> @GET
	=> /api/v1/hello
	=> Public
*/
exports.hello = asyncHdl(async (req, res, next) => {
	console.log('Hello Developer!');

	res.status(200).json({
		success: true,
		message: 'Hello Developer!',	
	})
});