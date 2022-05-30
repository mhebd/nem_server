const asyncHdl = require('../util/asyncHdl');
const errMsg = require('../util/errMsg');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const User = require('../model/User');

/**
	=> @POST
	=> /api/v1/user
	=> Public
*/
exports.createUser = asyncHdl(async (req, res, next) => {
	const { name, email, password, password2 } = req.body;

	// Check any fields are not missing
	if(!name || !email || !password || !password2 ) {
		return next(new errMsg('All the fields are required', 400));
	};

	// Chack email is valid
	if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
		return next(new errMsg('Email is not valid', 400))
	};

	// Chack if this email is already exist
	const hasUser = await User.findOne({ email });
	if(hasUser) {
		return next(new errMsg('This user is already exist.', 400));
	};

	// Chack password & confirm password match
	if(password !== password2) {
		return next(new errMsg('Your password and confirm password did not match', 400))
	};

	// Create gravatar
	const gravatarUrl = gravatar.url(email, { s: 200, r: 'x', d: 'retro'}, true);

	// Create user
	const user = await User.create({
		name,
		email,
		password,
		gravatar: gravatarUrl,
	});

	// Create token
	const token = await user.getToken();

	res.status(201).json({
		success: true,
		user,
		token,
		message: 'Signup Successfull.'
	})
});


/**
	=> @POST
	=> /api/v1/user
	=> Public
*/
exports.loginUser = asyncHdl(async (req, res, next) => {
	const { email, password } = req.body;

	// Check any fields are not missing
	if(!email || !password) {
		return next(new errMsg('All the fields are required', 400));
	};

	// Chack has user
	const user = await User.findOne({email});
	if(!user) {
		return next(new errMsg('User not found', 404));
	};

	// Varify passwrod
	if(!(await bcrypt.compare(password, user.password))) {
		return next(new errMsg('Email & passwrod did not match', 404))
	};

	// Create token
	const token = await user.getToken();

	res.status(201).json({
		success: true,
		user,
		token,
		message: 'Login successfull.',
	})
});


/**
	=> @GET
	=> /api/v1/user
	=> Private
*/
exports.getUser = asyncHdl(async (req, res, next) => {
	const {id} = req.user;
	const user = await User.findById(id).select('-password');

	res.status(200).json({
		success: true,
		user,
	})
});



/**
	=> @GET
	=> /api/v1/user/:id
	=> Private
*/
exports.getUserById = asyncHdl(async (req, res, next) => {
	const {id} = req.params;
	const user = await User.findById(id).select('-password');

	res.status(200).json({
		success: true,
		user,
	})
});


/**
	=> @PUT
	=> /api/v1/user
	=> Private
*/
exports.updateUser = asyncHdl(async (req, res, next) => {
	const {id} = req.user;
	const { name, phone, age, sex, address1, address2, city, country, zipCode, biodata } = req.body;

	// Create empty Object
	let updatedUser = {};
	updatedUser.contact = {};

	// Set fields
	if(name) updatedUser.name = name;
	if(phone) updatedUser.phone = phone;
	if(age) updatedUser.age = age;
	if(sex) updatedUser.sex = sex;
	if(address1) updatedUser.contact.address1 = address1;
	if(address2) updatedUser.contact.address2 = address2;
	if(city) updatedUser.contact.city = city;
	if(country) updatedUser.contact.country = country;
	if(zipCode) updatedUser.contact.zipCode = zipCode;
	if(biodata) updatedUser.biodata = biodata;

	// Update user
	const user = await User.findByIdAndUpdate(id, {$set: updatedUser}, {new: true});

	res.status(200).json({
		success: true,
		message: 'User Updated successfull.',
		user,
	})
});


/**
	=> @DELETE
	=> /api/v1/user
	=> Private
*/
exports.deleteUser = asyncHdl(async (req, res, next) => {
	const {id} = req.user;
	await User.findByIdAndDelete(id);

	res.status(200).json({
		success: true,
		message: 'Profile Deleted Successfull',
	})
});



/**
 * *****************************************
 * 				For Admin Section
 * *****************************************
 */

/**
	=> @GET
	=> /api/v1/user/all
	=> Limited
*/
exports.getAllUser = asyncHdl(async (req, res, next) => {
	const users = await User.find().select('-password').sort('-created');

	res.status(200).json({
		success: true,
		total: users.length,
		users,
	})
});


/**
	=> @DELETE
	=> /api/v1/user/:id
	=> Limited
*/
exports.deleteUserByAdmin = asyncHdl(async (req, res, next) => {
	const {id} = req.params;
	await User.findByIdAndDelete(id);

	res.status(200).json({
		success: true,
		message: 'User profile has been deleted.'
	})
});	
