//Utility file
const ErrorResponse = require('../utils/errorResponse');
//Middleware file
const asyncHandler = require('../middleware/async');

//Course Model file
const Course = require('../models/Course');

//@desc     Register User
//route     GET /api/v1/auth/register
//access    public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true });
});
