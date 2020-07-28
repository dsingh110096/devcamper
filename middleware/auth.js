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

//Grant access to specific rolls
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User with role: '${req.user.role}' is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
