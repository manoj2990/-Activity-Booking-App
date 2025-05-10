const express = require('express');
const router = express.Router();
const { bookActivity, getMyBookings, getAllBookings} = require('../controllers/booking.controller');
const { authMiddleware } = require('../middlewares/auth.middlewares');
const { adminMiddleware } = require('../middlewares/role.middlewares');

router.post('/:activityId/book', authMiddleware, bookActivity);
router.get('/my', authMiddleware, getMyBookings);
router.get('/admin/bookings', authMiddleware,adminMiddleware, getAllBookings);

module.exports = router;
