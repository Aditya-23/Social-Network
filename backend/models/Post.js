const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    text : {
        type : String,
        required : true
    },
    likes : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user'
            },
            name : {
                type : String
            }
        }
    ],
    comments : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'user'
            },
            name : {
                type : String
            },
            comment : {
                type : String
            },
            date : {
                type : Date,
                default : Date.now
            }
        }
    ],
    author : {
        type : String
    },
    avatar : {
        type : String
    },
    date : {
        type : Date,
        default : Date.now
    }
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;