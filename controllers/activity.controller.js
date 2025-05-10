const Activity = require('../models/activity.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

// Create a new activity
exports.createActivity = asyncHandler(async (req, res, next) => {
    const { title, description, location, date, time } = req.body;

  
    if (!title || !description || !location || !date || !time) {
        throw new ApiError(400, 'All fields (title, description, location, date, time) are required');
    }

  
    const activity = await Activity.create({ title, description, location, date, time });

    const activityData = {
        id: activity._id,
        title: activity.title,
        description: activity.description,
        location: activity.location,
        date: activity.date,
        time: activity.time
    };

    return new ApiResponse(201, 'Activity created successfully', activityData).send(res);
});




// List all activities
exports.listActivities = asyncHandler(async (req, res, next) => {
    const activities = await Activity.find();

    const activityList = activities.map(activity => ({
        id: activity._id,
        title: activity.title,
        description: activity.description,
        location: activity.location,
        date: activity.date,
        time: activity.time
    }));

    return new ApiResponse(200, 'Activities fetched successfully', activityList).send(res);
});
