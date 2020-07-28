const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

//Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  //Getting token from the headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  //Getting token from cookie
  /* else if (req.cookies.token) {
    token = req.cookies.token;
  } */

  //Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }

  try {
    //Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //currently logedIn user
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.error(err);
    return next(new ErrorResponse('Not authorize to access this route', 401));
  }
});
