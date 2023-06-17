const Router = require('express').Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const fetchUser = require("../middleware/fetchUser");

//Update User
Router.put('/:id', async (req, res) => {
    try {
        const userId = req.body.userId;
        if (userId !== req.params.id) {
            return res.status(403).send("You cannot update other users credentials!");
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const user = await User.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).send("Your Account has been updated successfully!");
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.error(err.message);
    }
});

//Delete User
Router.delete("/:id", async (req, res) => {
    try {
        const userId = req.body.userId;
        if (userId !== req.params.id) {
            return res.status(403).send("You cannot delete other users account!");
        }
        const user = await User.findByIdAndDelete(userId);
        res.status(200).send("Deleted Your Account successfully!");
    } catch (err) {
        res.status(500).send("Internal Server Error!");
        console.error(err.message);
    }
})

//Get a User
Router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, updateAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).send("Internal Server Error!");
        console.error(err.message);
    }
})

//Follow a User
Router.put("/follow/:id", async (req, res)=>{
    try {
        if(req.body.userId === req.params.id){
            return res.status(400).send("You cannot follow youself!");
        }
        const currUser = await User.findById(req.body.userId);
        const user = await User.findById(req.params.id);
        if(user.followers.includes(req.body.userId)){
            return res.status(400).send("You already follow this user");
        }
        await user.updateOne({$push : {followers : req.body.userId}});
        await currUser.updateOne({$push : {followings : req.params.id}});

        res.status(200).send("User has been followed");
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.error(err.message);
    }
})
//Unfollow a User
Router.put("/unfollow/:id", async (req, res)=>{
    try {
        if(req.body.userId === req.params.id){
            return res.status(400).send("You cannot unfollow youself!");
        }
        const currUser = await User.findById(req.body.userId);
        const user = await User.findById(req.params.id);
        if(!user.followers.includes(req.body.userId)){
            return res.status(400).send("You have already unfollowed this user");
        }
        await user.updateOne({$pull : {followers : req.body.userId}});
        await currUser.updateOne({$pull : {followings : req.params.id}});

        res.status(200).send("User has been unfollowed");
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.error(err.message);
    }
})

module.exports = Router;