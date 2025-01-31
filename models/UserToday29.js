const mongoose = require('mongoose');
const UserToday29Schema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('UserToday29', UserToday29Schema);
