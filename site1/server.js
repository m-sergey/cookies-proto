'use strict'

var express = require('express');

var app = module.exports = express()
var cookieParser = require('cookie-parser');
var cors = require('cors');
const fs = require("fs");
const https = require("https");

const options = {
  key: fs.readFileSync('security/key.pem'),
  cert: fs.readFileSync('security/cert.pem')
};

app.use(cors({credentials: true, origin: 'http://localhost:3001'}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://site2.local:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Set-Cookie');
    res.setHeader('Access-Control-Allow-Headers', 'Set-Cookie');


    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cookieParser('my secret here'));

app.get('/', function(req, res){
  res.send('Started');
});

app.get('/exchange', function(req, res){
    res.cookie('remember', 1, {
      domain: "idp.local",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'None', 
      secure: true
    });
    res.send('Exchange');
  });

app.get('/forget', function(req, res){
    // res.clearCookie('remember');
    res.cookie('remember', 0, {
      domain: "idp.local",
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'None', 
      secure: true
    });

    res.send('Cookie was cleaned');
});

app.get('/restricted', function(req, res){
    console.log('req.cookies.remember=' + req.cookies.remember);
    if (req.cookies.remember === "1") {
        res.send('Restricted content');
    } else {
      res.send(401, 'Access denied');
    }
});

if (!module.parent) {
  https.createServer(options, app).listen(3000);
  console.log('Express started on port 3000');
}
