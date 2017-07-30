var mongoose = require('mongoose');

// Course Schema
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
    assist1:{
        type: String,
        required: false
    },
    assist2:{
        type: String,
        required: false
    },
    assist3:{
        type: String,
        required: false
    },
    user: String

});

module.exports = mongoose.model('Course', courseSchema);