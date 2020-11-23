const mongoose = require('mongoose')

const AttendanceSchema = new mongoose.Schema({
   inTime: {
       type: Date
   },
   outTime: {
       type: Date
   }
})

module.exports = mongoose.model('Attendance', AttendanceSchema)