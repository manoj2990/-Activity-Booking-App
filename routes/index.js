const authRouter = require('./auth.routes');
const activityRouter = require('./activity.routes');
const bookingRouter = require('./booking.routes');

const API_VERSION = '/api/v1';

module.exports = (app) => {
    app.use(`${API_VERSION}/auth`, authRouter);
    app.use(`${API_VERSION}/activities`, activityRouter);
    app.use(`${API_VERSION}/bookings`, bookingRouter);
};
