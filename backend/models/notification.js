const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {  //Implement last updated by time and date also
        type: Date,
        default: Date.now
    },
    seenStatus: {
        type: Boolean,
        default: false
    },
    type:{
        type:String
    }
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;