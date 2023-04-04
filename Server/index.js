const express = require('express');
const app = express();
const connectToMonogo = require('./db');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversation');
const messageRoute = require('./routes/message');

const port = 5000;
const bodyParser = require('body-parser');
const path = require('path');
connectToMonogo();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use("/images", express.static(path.join(__dirname, "'public/Assets/Posts'")));

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/message', messageRoute);

app.listen(port, () => {
    console.log(`Social app running at http://localhost:${port}`);
})