const express = require('express');
const dotenv = require('dotenv').config({ path: 'config/.env' });
const morgan = require('morgan');
const cors = require('cors');
const database = require('./db/database');
const error = require('./middleware/error');
const path = require('path');

// Routers Path
const userRouter = require('./route/user');

// Create Server
const app = express();

// Use MiddleWare
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, '/')))

// Add Database
database();

// Route End Point
app.use('/api/v1/user', userRouter);

// Show Error Message
app.use(error);

//->Show UI...
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
} else if (process.env.NODE_ENV === 'development') {
	app.get('/', (req, res) => {
		res.send('Hello, Developer...');
	});
}

module.exports = app;
