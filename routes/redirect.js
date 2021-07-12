const express = require("express");
const router = express.Router();

const Url = require("./models/Url");

//: app.get(/:decode)

//@route GET api/url/:decode
//@description convert short url to original url and send response to client, or redirect to that url

router.get('/:decode',async(req,res) => {
    try {
        // run a query in the db to match the url passed to see if there's a longUrl match
        const url = await Url.findOne({
            urlCode: req.params.decode
        });
        if(url) {
            // if the code is valid we return the longUrl as a json object to the client (or redirect depending)
            return res.status(200).json(url.longUrl);
        }
        // else return an error to the clien
        else {
            return res.status(404).json('No url found for that code');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error.");
    }
});

module.exports = router;