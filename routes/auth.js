const express = require('express');
const router = express.Router();
//middleware files
const { protect } = require('../middleware/auth');

//Controller files
//Auth controller
const {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  updateMe,
  updatePassword,
} = require('../controllers/auth');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(protect, getMe);
router.route('/updateme').put(protect, updateMe);
router.route('/updatepassword').put(protect, updatePassword);
router.route('/forgotpassword').post(forgotPassword);
router.route('/resetpassword/:resettoken').put(resetPassword);

module.exports = router;
