// import express
const express = require("express");
const connectDB = require("./config/db.config");
const path = require("path");

//instantiate express 
const app = express();
connectDB();
app.use(express.json());

//routes
//app.use('/api/redirect', require('./routes/redirect'));
app.use('/',require('./routes/redirect'));
app.use('/api/url',require('./routes/url'));

const PORT = process.env.PORT || 5000
// listen for incoming requests
app.listen(PORT, () => console.log(`server started, listening at PORT ${PORT}`));