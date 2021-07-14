const express = require('express');
const expect = require('chai').expect;
const request = require('supertest');

const validUrl = require('valid-url');
const shortid  = require("shortid");

const config = require('config');
const app = express();

describe('Shorten Route', () => {
     const url_path = shortid.generate();
            const baseUrl = config.get("baseUrl");
            const shortenedUrl = baseUrl + "/" + url_path;
            console.log(shortenedUrl);
    it('shortened url', () => {
      request(app)
      .post('http://localhost:5000/api/url/encode')
        .send({
            longUrl: 'https://google.com'
        })
        .expect(200)
        .then((res) => {
           expect(res.body.shortUrl).to.be.eql(shortenedUrl);
        });
    });
});
