const express = require('express');
const router = express.Router();

//Controller files
//Auth controller
const { register } = require('../controllers/auth');

router.route('/register').post(register);

module.exports = router;
