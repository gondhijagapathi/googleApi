var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey = fs.readFileSync('/etc/letsencrypt/live/jagapathi.me/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/jagapathi.me/fullchain.pem', 'utf8');

var credentials = { key: privateKey, cert: certificate };
var express = require('express');
var app = express();

app.post('/', function(req, res) {
    const { exec } = require("child_process");
    let cpuTemp = 0;
    exec("cat /sys/class/thermal/thermal_zone*/temp", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        cpuTemp = Number(stdout) / 1000;
        res.json({
            "payload": {
                "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                        "items": [{
                            "simpleResponse": {
                                "textToSpeech": "CPU Temperature " + cpuTemp + " degrees celsius"
                            }
                        }]
                    }
                }
            }
        })
    });
})
app.get('/', function(req, res) {
        res.send("hello");
    })
    // your express configuration here

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(3000, function() {
    console.log("googleApi listening at https://jagapathi.me:3000")
});