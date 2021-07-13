const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

//: app.get(/:url_path)

//@route GET api/statistic/:url_path
//@description retrieve pre-defined path (url) data from supplying just the short url generated earlier

router.get('/:url_path',async(req,res) => {
    try {
        // run a query in the db to match the url passed to see if there's a longUrl and/or data match
        const url = await Url.findOne({
            url_path: req.params.url_path
        });
        if(url) {
            // if the code is valid we redirect the client to the longUrl)
            return res.status(200).json({
                longUrl:url.longUrl,
                shortUrl:url.shortUrl,
                DateCreated:url.date,
                hostname:url.hostname,
                protocol:url.protocol
            });
        }
        // else return an error to the client
        else {
            return res.status(404).json('No data available for the url path specified');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error.");
    }
});

module.exports = router;