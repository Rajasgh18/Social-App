const Router = require('express').Router();
const Message = require('../models/Message');

//Post Message
Router.post("/", async(req, res)=>{
    const newMessage = new Message(req.body);

    try{
        const message = await newMessage.save();
        res.status(200).json(message);
    } catch(err){
        res.status(500).send(err);
    }
})

//Get Message
Router.get("/:conversationId", async(req, res)=>{
    try {
        const message = await Message.find({conversationId: req.params.conversationId})
        res.status(200).json(message);
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = Router;