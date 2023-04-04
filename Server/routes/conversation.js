const Router = require('express').Router();
const Conversation = require('../models/Conversation');

//New Conversation
Router.post("/", async (req, res) => {

    const conv = await Conversation.find({
        members: { $in: [req.body.receiverId] }
    });
    if (conv.length !== 0) {
        return res.status(201).json(conv);
    }

    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })

    try {
        const savedConversations = await newConversation.save();
        res.status(200).json(savedConversations);
    } catch (err) {
        res.status(500).send(err);
    }
})

//Get Conversation of a User
Router.get("/:userId", async (req, res) => {
    try {
        const conv = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        res.status(200).json(conv);
    } catch (err) {
        res.status(500).send(err);
    }
});

Router.put("/:id", async (req, res) => {
    try{
        const conv = await Conversation.findByIdAndUpdate(req.params.id, {updatedAt: Date.now()});
        
        res.status(200).json(conv);
    } catch(err){
        res.status(500).send(err);
    }
})

module.exports = Router;