{\rtf1\ansi\ansicpg1252\cocoartf2580
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fmodern\fcharset0 Courier;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs24 \cf2 \expnd0\expndtw0\kerning0
\outl0\strokewidth0 \strokec2 ShortLink\
=========\
ShortLink is an api built using the express framework on the nodejs runtime. This application is a URL Shortening service in which entering a long url returns a short url as a response. Visiting the shortened url takes the user to the original long url. One can additionally get basic pre-defined data by entering the url path(the shortened url code in this case), and getting the data as a response.\
\
\
\
# Running Locally\
\
Make sure you have [Node.js](http://nodejs.org/) installed on the Mac or Windows PC. Instructions for downloading and installing node can be found on the url specified. For best uses on the Mac, run the command using homebrew (Expectedly, homebrew should be installed). The command to install node is brew install node.\
\
\
# Version and Running\
\
The current version of this project can be downloaded from the zip file sent in the e-mail to join@indicina.co. Alternatively, the project can be cloned from the git url using the command:\
git clone git@github.com:ayorindeadunse/url-shortner-service.git. Alternatively the zip file can be downloaded from the url https://github.com/ayorindeadunse/url-shortner-service/tree/master\
\
Once downloaded, navigate to the ShortLink directory which would be \
\
\
cd url-shorter-service\
\
Download the project dependencies by running the npm command:\
npm install\
\
A database collection was created in mongodb atlas, and a specific db user and password has been created for the project. The details can be found in the config/default.json file in the project.\
\
Run the command node server.js to start the server. The server will be running locally on http://localhost:5000\
\
\
# Endponts\
\
There are three endpoints in this project;\
\
1). /encode - the Full path to this endpoint is: http://localhost:5000/api/url/encode .Pass the **longUrl** parameter in the post request. Clicking the send button in postman should return a JSON object which will contain a shortUrl and url_path in the response.\
\
2) /:decode - This endpoint takes the shortUrl as a get request (specify this in the browser) and will return the long url back to the client.\
\
3) /:url_path - the full path to this endpoint is: http://localhost:5000/api/statistic/\{url_path\}. This is a get request which takes the code generated for the converted long ur as a parameter. Clicking the send button in postman returns a JSON object which will contain the longUrl, shortUrl, DateCreated, hostname and protocol in the response. These are pre-determined parameters.\
\
}