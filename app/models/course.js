var mongoose = require('mongoose');

// COURSE SCHEMA
var courseSchema = mongoose.Schema({
    date:{
        type: String,
        required: true
    },
    course:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    courseDirector:{
        type: String,
        required: true
    },
    user: String
});
// END OF COURSE SCHEMA
module.exports = mongoose.model('Course', courseSchema);