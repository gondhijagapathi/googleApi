var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('/etc/letsencrypt/live/jagapathi.me/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/jagapathi.me/fullchain.pem', 'utf8');

var credentials = { key: privateKey, cert: certificate };
var express = require('express');
var app = express();

app.post('/', function(req, res) {
        res.send("hello");
    })
    // your express configuration here

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000);