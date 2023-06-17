const Router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

//Route for Register
Router.post('/register', [
    body("name", "Enter a username with more than 3 characters!").isLength({ min: 3 }),
    body("email", "Enter a valid username!").isEmail(),
    body("password", "Enter a password with more than 6 characters!").isLength({ min: 6 })
], async (req, res) => {
    try {
        //It displays error in body of request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        //It checks whether a user exists with same email or not
        let user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400).send("A User exists with this email, please choose another email!");
        }

        //Generate salt and convert the password to hash
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);

        //Create the user 
        const newUser = await new User({
            name: req.body.name,
            email: req.body.email,
            password: secPassword
        })
        const data =  {
            user : {
                id : newUser.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)

        //Save the user in the database and send the respond
        user = await newUser.save();
        success = true;
        res.status(200).json({user, authToken});

    } catch (error) {
        res.status(500).send("Internal Server Error!");
        console.log(error.message);
    }
});

//Route for Login
Router.post('/login', async(req, res) => {

    try{
        //Finding the user if the user exists or not
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) return res.status(400).send("There exists no user with this email!");
        
        //Checking if the password is correct or not
        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword) return res.status(400).send("Please enter correct password!");

        const data = {
            user : {
                id : user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        //Sending the user data after checking correct credentials
        res.json({user, authToken});
    } catch(err){
        res.status(500).send("Internal Server Error!");
        console.log(err);
    }

})

module.exports = Router;
