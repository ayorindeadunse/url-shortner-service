const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

//: app.get(/:decode)

//@route GET api/url/:decode
//@description convert short url to original url and redirect to that url

router.get('/:decode',async(req,res) => {
    try {
        // run a query in the db to match the url passed to see if there's a longUrl match
        const url = await Url.findOne({
            url_path: req.params.decode
        });
        if(url) {
            // if the code is valid we redirect the client to the longUrl)
            return res.redirect(url.longUrl)
        }
        // else return an error to the client
        else {
            return res.status(404).json('No url found for that code');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error.");
    }
});

module.exports = router;