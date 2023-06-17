const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const connectToMonogo = () => {
    // mongoose.set('strictQuery', true);
    mongoose.connect(process.env.REACT_APP_MONGO_URL, { useNewUrlParser: "true", useUnifiedTopology: "true" })
    const db = mongoose.connection;
    db.on('connected', () => { console.log("MongoDB is Connected!") });
    db.on('error', (err) => { err });
}

module.exports = connectToMonogo;