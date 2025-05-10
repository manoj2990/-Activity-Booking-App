
//ApiResponse
const http = require('http');

class ApiResponse {
  constructor(statusCode, data = null, message = http.STATUS_CODES[statusCode]) {
    this.statusCode = statusCode;
    this.status = http.STATUS_CODES[statusCode] || 'Unknown Status'; 
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.timestamp = new Date().toISOString();
  }

  send(res) {
    return res.status(this.statusCode).json({
      success: this.success,
      statusCode: this.statusCode,
      status: this.status, 
      message: this.message,
      data: this.data,
      timestamp: this.timestamp
    });
  }
}

module.exports = ApiResponse;