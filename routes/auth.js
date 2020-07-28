const express = require('express');
const router = express.Router();

//Controller files
//Auth controller
const { register, login } = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);

module.exports = router;
