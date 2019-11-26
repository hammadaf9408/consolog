const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err }
  // console.log('error 1', error);

  // to override or add the message into error
  error.message = err.message;
  // console.log('error 2', error);

  // Log to console for dev
  // console.log('error', err);

  // console.log(err.name);

  // Mongoose bad objectID
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;

    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }
  
  res.status(error.stausCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};

module.exports = errorHandler;
