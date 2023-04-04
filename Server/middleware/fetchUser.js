const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

//Get the user from the jwt token and id to req object
const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).json({error : "Please enter a token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).json({error : "Please authenticate using a valid token"});
    }
}

module.exports = fetchUser;