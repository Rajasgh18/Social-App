const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    desc : {
        type : String,
        max : 500
    },
    img : {
        type : String,
        require: true
    },
    likes : {
        type : Array,
        default : []
    }
},{timestamps : true})

const Post = mongoose.model('post', PostSchema);
module.exports = Post;