const Booking = require('../models/booking.model');
const Activity = require('../models/activity.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

// Book an activity
exports.bookActivity = asyncHandler(async (req, res, next) => {
    const { activityId } = req.params;

    if(!activityId){
        throw new ApiError(404, 'ActivityId is required'); 
    }


    const activity = await Activity.findById(activityId);
    if (!activity) {
        throw new ApiError(404, 'Activity not found');
    }


    const existingBooking = await Booking.findOne({ user: req.user.id, activity: activityId });
    if (existingBooking) {
        throw new ApiError(409, 'You have already booked this activity');
    }

  
    const booking = await Booking.create({ user: req.user.id, activity: activityId });

    const bookingData = {
        id: booking._id,
        user: booking.user,
        activity: booking.activity,
        createdAt: booking.createdAt
    };

    return new ApiResponse(201, 'Activity booked successfully', bookingData).send(res);
});




// Get all bookings of logged-in user
exports.getMyBookings = asyncHandler(async (req, res, next) => {

    if(!req.user.id){
        throw new ApiError(404, 'user Id is required');
    }
    const bookings = await Booking.find({ user: req.user.id }).populate('activity');

    if(!bookings){
        throw new ApiError(404,'user booking is not exist')
    }

    const bookingList = bookings.map(booking => ({
        id: booking._id,
        activity: {
            id: booking.activity._id,
            title: booking.activity.title,
            description: booking.activity.description,
            location: booking.activity.location,
            date: booking.activity.date,
            time: booking.activity.time
        },
        bookedAt: booking.createdAt
    }));

    return new ApiResponse(200, 'Your bookings fetched successfully', bookingList).send(res);
});



//get all booking for admin
exports.getAllBookings = asyncHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
        throw new ApiError(403, 'Access denied. Admins only.');
    }

    const bookings = await Booking.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        { $unwind: '$user' },
        {
            $lookup: {
                from: 'activities',
                localField: 'activity',
                foreignField: '_id',
                as: 'activity'
            }
        },
        { $unwind: '$activity' },
        {
            $group: {
                _id: '$user._id',
                user: { $first: '$user' },
                activities: {
                    $push: {
                        _id: '$activity._id',
                        title: '$activity.title',
                        description: '$activity.description',
                        location: '$activity.location',
                        date: '$activity.date',
                        time: '$activity.time'
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                user: {
                    _id: '$user._id',
                    name: '$user.name',
                    email: '$user.email',
                    phone: '$user.phone'
                },
                activities: 1
            }
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, bookings, 'Bookings fetched successfully'));
});




