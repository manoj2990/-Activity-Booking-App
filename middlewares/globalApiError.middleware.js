
// globalApiErrorMiddleware
const ApiResponse = require('../utils/apiResponse');
const http = require('http');

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let status = http.STATUS_CODES[statusCode] || 'Unknown Status'; 
  let message = err.message || "Internal Server Error";

  if (err.name === 'ValidationError') {
    statusCode = 400;
    status = http.STATUS_CODES[400];
    message = Object.values(err.errors).map(val => val.message).join(', ');
  }

  const response = new ApiResponse(
    statusCode,
    null,
    message
  );

 
  response.status = status;

  console.error(`[${new Date().toISOString()}]`, {
    statusCode,
    status,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  response.send(res);
};

module.exports = errorHandler;