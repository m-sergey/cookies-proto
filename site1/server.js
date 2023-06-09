'use strict'

var express = require('express');

var app = module.exports = express()
var cookieParser = require('cookie-parser');
var cors = require('cors');

app.use(cors());
app.use(cookieParser('my secret here'));

app.get('/', function(req, res){
  res.send('Started');
});

app.get('/exchange', function(req, res){
    res.cookie('remember', 1, {});
    res.send('Exchange');
  });

app.get('/forget', function(req, res){
    res.clearCookie('remember');
    res.send('Cookie was cleaned');
});

app.get('/restricted', function(req, res){
    if (req.cookies.remember) {
        res.send('Restricted content');
    } else {
      res.send(401, 'Access denied');
    }
});

if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
