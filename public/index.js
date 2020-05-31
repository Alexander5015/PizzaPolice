const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const request = require('request');
const app = express();
const port = 80;

const privateKey = fs.readFileSync("/etc/letsencrypt/live/covidengine.ddns.net/privkey.pem", "utf8");
const certificate = fs.readFileSync("/etc/letsencrypt/live/covidengine.ddns.net/fullchain.pem", "utf8");
const credentials = {key: privateKey, cert: certificate};

app.use(express.static('public'));

app.get("/", (req, res) => {
	// Return the main page
	res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/news", (req, res) => {
	// Return all the COVID news
	var options = {
		'method': 'POST',
		'url': 'https://covid19-us-api.herokuapp.com/news',
		'headers': {},
		body: "{\"topic\":\"coronavirus\"}"
	};
	request(options, function(error, response) {
		if(error) res.send(error);
		else res.send(response);
	});
});

app.post("/api/signup", (req, res) => {
	
});

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
httpServer.listen(80);
httpsServer.listen(443);
