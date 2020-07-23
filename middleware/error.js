const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  //coping err to write custom message
  let error = { ...err };
  error.message = err.message;

  //Loging to the console for dev
  console.log(err.stack.red);

  //Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = `Resource with id of ${err.value} not found`;
    error = new ErrorResponse(message, 404);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};

module.exports = errorHandler;
