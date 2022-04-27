const { Schema, model } = require('mongoose');
const {ObjectId} = Schema.Types
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    likes:[{
        type:ObjectId,
        ref:'user'
    }],
    postedBy:{
        type:ObjectId,
        ref:'user'
    }   
},{ timestamps: true })

const Post = model('post',postSchema)

module.exports.Post = Post