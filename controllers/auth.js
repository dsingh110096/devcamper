//Utility file
const ErrorResponse = require('../utils/errorResponse');
//Middleware file
const asyncHandler = require('../middleware/async');

//User Model file
const User = require('../models/User');

//@desc     Register User
//route     GET /api/v1/auth/register
//access    public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //Create User
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  //Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
