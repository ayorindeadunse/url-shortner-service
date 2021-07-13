const express = require("express");
const validUrl = require("valid-url");
const shortid  = require("shortid");

const config = require("config");

const baseUrl = config.get("baseUrl");

//call Router() function of express
const router = express.Router();

//import URL database model

const Url = require("../models/Url");

//@route POST /api/url/encode  (Post route to encode/shorten urls)
//@description Convert a long url to a short url


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
    const url_path = shortid.generate();

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
                res.json({
                    shortUrl:url.shortUrl,
                    url_path:url.url_path
                });
            }
            else
            {
                // join the generated short code to the base url defined earlier
                const shortUrl = baseUrl + "/" + url_path
                // log the hostname,domain and protocol as part of the data stat parameters
                const usedUrl = new URL(longUrl);
                const hostname = usedUrl.hostname;
                const protocol = usedUrl.protocol;


                // save this record to the db (or append to the array if we choose not to use the db)
                url = new Url({
                    longUrl,
                    shortUrl,
                    url_path,
                    date: new Date(),
                    hostname,
                    protocol         
                });
                await url.save();

                // send the object as a response to the client,  or send just the short url as the reponse
              // res.json(url);
              res.status(200).json({
                  shortUrl:url.shortUrl,
                  url_path:url.url_path
              });
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