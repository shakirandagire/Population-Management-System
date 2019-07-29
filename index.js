const express = require('express');
const bodyParser = require('body-parser');
const db = require('./services/db');
const mongoose = require('mongoose');


const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json({ type: 'application/json' }))

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(db.url, {
    useNewUrlParser: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Population Management System."});
});

require('./routes/location')(app)

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

module.exports = app;