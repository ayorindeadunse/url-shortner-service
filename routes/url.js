const express = require("express");
const validUrl = require("valid-url");
const shortid  = require("shortid");

//call Router() function of express
const router = express.Router();

//import URL database model (also consider creating an empty array object to store the url object in memory)

const Url = require("../models/Url");

//@route POST /api/url/encode  (Post route to encode/shorten urls)
//@description Convert a long url to a short url

//base URL endpoint

const baseUrl = 'http://localhost:5000';

// post route
router.post('/encode', async(req,res) => {
    const {
        longUrl
    } = req.body // destructure the longUrl from req.body.longUrl

    //check base url if it's valid using validUrl.isUri method
    if(!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base Url');
    }
    // if valid, create the url code
    const urlCode = shortid.generate(); // consider just sending the response to the client isntead of saving in db

    //check long url if valid using the validUrl.isUri method
    if(validUrl.isUri(longUrl))
    {
        try {
            /* Check existing records in the db collection to see if it matches what's passed
            in the query to ensure that the url that's generated is not similar to what exists
            .If there's a match, throw an error, if there isn't we create the short url  */

            let url = await Url.findOne({
                longUrl
            });

            // if the url exists, return the response message
            if(url)
            {
                res.json(url)
            }
            else
            {
                // join the generated short code to the base url defined earlier
                const shortUrl = baseUrl + "/" + urlCode

                // save this record to the db (or append to the array if we choose not to use the db)
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();

                // send the object as a response to the client,  or send just the short url as the reponse
                res.json(url);
            }
        } catch (err) {
            console.log(err)
            res.status(500).json('An exception occured!');
        }
    }
    else {
        // if the url supplied is invalid
        res.status(401).json('Please supply a valid url. Thank you.');
    }
});

module.exports = router;