const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    emailId: {
        type: String
    },
    mobileNo: {
        type : Number
    },
    feesRemaining: {
        type: Number,
        default: 600
    },
    dateOfJoining: {
        type: Date,
        default: Date.now
    },
    attendance: [{inTime: Date, outTime: Date, date: Date}]
    // attendance: [Date]

})

module.exports = mongoose.model('User', UserSchema)