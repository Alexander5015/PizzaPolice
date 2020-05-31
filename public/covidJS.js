// This function is a callback for the button, it changes the local view to thatever the user wants
function checkCountry() {
	// Put the proper country name in the local stats box
	document.getElementById("statsHere").innerHTML = "COVID-19 Statistics in " + getCountryName(document.getElementById("countryCode").value);

	// Call the COVID-19 API to grab the info for the country the user wants to check
	$.get("https://api.covid19api.com/summary", function(data) {
                data["Countries"].forEach(function(item, index) {
                        if(item["CountryCode"] == document.getElementById("countryCode").value) {
                                var hereNew = item["NewConfirmed"];
                                var hereTotal = item["TotalConfirmed"];
                                var hereNewDeaths = item["NewDeaths"];
                                var hereTotalDeaths = item["TotalDeaths"];
                                document.getElementById("hereCases").innerHTML = hereNew + " new cases today (" + hereTotal + " total)";
                                document.getElementById("hereDeaths").innerHTML = hereNewDeaths + " new deaths today (" + hereTotalDeaths + " total)";
                        }
                });
        });
}

// Get user's country
var countryCode = 0;
$.get("https://ipinfo.io/json", function(data) {
	countryCode = data["country"]; // Get the 2-letter country code for grabbing data from the covid API
	document.getElementById("statsHere").innerHTML = "COVID-19 Statistics in " + getCountryName(countryCode);
	document.getElementById("countryCode").value = countryCode;

	// Now that we have a country code, we can call the COVID-19 API to grab stats
	$.get("https://api.covid19api.com/summary", function(data) {
		// Get the worldwide stats
		var worldwideNew = data["Global"]["NewConfirmed"];
		var worldwideTotal = data["Global"]["TotalConfirmed"];
		var worldwideNewDeaths = data["Global"]["NewDeaths"];
		var worldwideTotalDeaths = data["Global"]["TotalDeaths"];
		document.getElementById("worldwideCases").innerHTML = worldwideNew + " new cases today (" + worldwideTotal + " total)";
		document.getElementById("worldwideDeaths").innerHTML = worldwideNewDeaths + " new deaths today (" + worldwideTotalDeaths + " total)";

		data["Countries"].forEach(function(item, index) { // Loop over all of them and grab the country we need
			if(item["CountryCode"] == countryCode) {
				var hereNew = item["NewConfirmed"];
				var hereTotal = item["TotalConfirmed"];
				var hereNewDeaths = item["NewDeaths"];
				var hereTotalDeaths = item["TotalDeaths"];
				document.getElementById("hereCases").innerHTML = hereNew + " new cases today (" + hereTotal + " total)";
				document.getElementById("hereDeaths").innerHTML = hereNewDeaths + " new deaths today (" + hereTotalDeaths + " total)";
			}
		});
	});
});

// Call the Google News API and grab covid news
$.get("https://covidengine.ddns.net/api/news", function(data) {
	data = JSON.parse(data["body"]);
	console.log(data);
	data["message"].forEach(function(item, index) {
		if(item["title"].includes("coronavirus")) {
			// This is kinda messy, but it works well enough for a prototype
			title = item["title"].replace("<", ""); // Prevent XSS
			document.getElementById("newsbox").innerHTML = document.getElementById("newsbox").innerHTML + "<a href=\"" + item["url"] + "\">" + title + "</a><br>";
		}
	});
});
