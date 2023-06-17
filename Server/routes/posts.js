const Router = require('express').Router();
const Post = require('../models/Posts');
const User = require('../models/User');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Assets/Posts');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})
const upload = multer({ storage });

//Create a Post
Router.post("/", upload.single('file'), async (req, res) => {
    try {
        const newPost = await new Post(req.body);
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.error(error.message);
    }
})

//Upload a Post
Router.post("/upload", upload.single('file'), async (req, res) => {
    try {
        res.status(200).send("Post saved successfully!");
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.error(error.message);
    }
})


//Update a Post
Router.put("/:id", async (req, res) => {
    try {
        if (req.body.userId !== req.params.id) {
            return res.status(400).send("You cannot update others posts!");
        }
        const post = await Post.findByIdAndUpdate(req.body._id, { $set: req.body });
        res.status(200).send("Post updated successfully!");
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.error(error.message);
    }
})

//Delete a Post
Router.delete("/:id", async (req, res) => {
    try {
        //It checks whether entered id and userId is same or not
        if (req.body.userId !== req.params.id) {
            return res.status(400).send("You cannot delete others posts!");
        }

        //It finds the post with _id and deletes it
        const post = await Post.findByIdAndDelete(req.body._id);
        res.status(200).send("Post updated successfully!");
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.error(error.message);
    }
})
//Like a Post
Router.put("/like/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.body._id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.params.id } });
            return res.status(200).send(true);
        }
        await post.updateOne({ $pull: { likes: req.params.id } });
        res.status(200).send(false);
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.error(error.message);
    }
})

//Get a post
Router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findOne(req.params.userId);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.error(error.message);
    }
})

//Get Timeline Posts
Router.get("/timeline/:id", async (req, res) => {
    try {
        const currUser = await User.findById(req.params.id);
        const userPosts = await Post.find({ userId: currUser._id });
        const friendPosts = await Promise.all(
            currUser.followings.map(friendId => {
                return Post.find({ userId: friendId })
            })
        )
        res.json(userPosts.concat(...friendPosts));
    } catch (err) {
        res.status(500).send("Internal Server Error!");
        console.error(err.message)
    }
})

module.exports = Router;