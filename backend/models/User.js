const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    avatar : {
        type : String
    }

})

const User = mongoose.model('user', userSchema);

module.exports = User;