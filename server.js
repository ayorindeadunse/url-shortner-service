// import express
const express = require("express");

//instantiate express 
const app = express();
const PORT = process.env.PORT || 5000
// listen for incoming requests
app.listen(PORT, () => console.log(`server started, listening at PORT ${PORT}`));