const fs = require('fs'); // For loading SSL cert
const path = require('path'); // For sending specific files
const http = require('http'); // Non-secure server for like, windows XP
const https = require('https'); // Secure server
const express = require('express'); // Routing software
const request = require('request'); // Used to call different APIs
const app = express();

const privateKey = fs.readFileSync("SSL PRIVATE KEY HERE", "utf8");
const certificate = fs.readFileSync("SSL CERTIFICATE HERE", "utf8");
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
	// Didn't have time to implement a secure version of this, Would go something like this though:
	//
	// var confirmationToken = email.sendConfirmationEmail(req.body.email);
	// db.add("confirmationTokens", {"email": req.body.email, "token": confirmationToken});
	//
	// Of course email and db don't exist, this is just a skeleton
});

app.get("/api/confirm", (req, res) => {
	// Didn't have time to implement a secure version of this. Would go something like this though:
	//
	// if(db.hasItem({"token": req.body.token}) {
	// 	db.add("emails", {"email": db.getItem("email", {"token": req.body.token})});
	// 	db.remove("confirmationTokens", {"token": req.body.token});
	// }
	//
	// Of course email and db don't exist, this is just a skeleton
}

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
httpServer.listen(80);
httpsServer.listen(443);
