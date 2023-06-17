const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    conversationId: {
        type: String
    },
    senderId: {
        type: String
    },
    text: {
        type: String
    }
},{timestamps : true})

const Message = mongoose.model('message', MessageSchema);
module.exports = Message;