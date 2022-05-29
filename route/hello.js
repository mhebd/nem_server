const express = require('express');
// const { private, limited } = require('../middleware/auth');
const { hello } = require('../controler/hello');
const router = express.Router();

router.route('/').get(hello);

module.exports = router;