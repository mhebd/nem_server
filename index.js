const app = require('./app');

// Listening Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
	if(err) {
		console.log(err);
	} else {
		console.log(`Server is running on http://localhost:${PORT}`);
	}
})