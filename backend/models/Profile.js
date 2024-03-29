const mongoose = require('mongoose');
const { stringify } = require('nodemon/lib/utils');

const profileSchema = new mongoose.Schema({
    user : { // user id
        type : String,
    },
    fullName : {
        type: String,
    },
    company : {
        type : String
    },
    website : {
        type : String
    },
    bio : {
        type : String
    },
    status : {
        type : String,
        required : true
    },
    skills : {
        type : [String],
        required : true
    },
    github : {
        type : String
    },
    email: {
        type: String
    },
    avatar : {
        type : String
    },
    experience : [
        {
            title : {
                type : String,
                required : true
            },
            company : {
                type : String,
                required : true
            },
            from : {
                type : Date,
                required : true
            },
            to : {
                type : Date
            },
            location : {
                type : String
            },
            current : {
                type : Boolean,
            },
            description : {
                type : String,
                maxlength : 500
            }
        }
    ],
    education : [
        {
            school : {
                type : String,
                required : true
            },
            degree : {
                type : String,
                required : true
            },
            from : {
                type : Date,
                required: true
            },
            to : {
                type : Date
            },
            fieldofstudy : {
                type : String
            }
        }
    ],
    socialmedia :{
            facebook : {
                type : String
            },
            instagram : {
                type : String
            },
            linkedin : {
                type : String
            },
            twitter : {
                type : String
            },
            youtube : {
                type : String
            }
        },
    date : {
        type : Date,
        default : Date.now
    }
});

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;