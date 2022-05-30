const mongoose = require('mongoose');

module.exports = () => {
	const STRING = process.env.CON_STRING.replace('{&PASSWORD&}', process.env.PASSWORD);
	const config = {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}

	return mongoose.connect(STRING, config)
		.then(data => console.log(`DB Connection Stablished`))
		.catch(err => console.log(err));
};