// import express
const express = require("express");
const connectDB = require("./config/db.config");
const path = require("path");

//instantiate express 
const app = express();
connectDB();
app.use(express.json());
const PORT = process.env.PORT || 5000
// listen for incoming requests
app.listen(PORT, () => console.log(`server started, listening at PORT ${PORT}`));