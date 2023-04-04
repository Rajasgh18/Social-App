const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 5,
        max: 50
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followings: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    school: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    }
}, { timestamps: true });

const User = mongoose.model("user", UserSchema);
module.exports = User;