const mongoose = require('mongoose');

// instantiate the mongoose schema
const urlSchema  = new mongoose.Schema({
    url_path: String,
    longUrl: String,
    shortUrl: String,
    date:{
        type: String,
        default: Date.now
    }
});

// export model
module.exports = mongoose.model('Url',urlSchema);