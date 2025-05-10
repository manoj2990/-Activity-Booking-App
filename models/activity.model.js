
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: String,
    description: String,
    location: String,
    date: Date,
    time: String
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);
