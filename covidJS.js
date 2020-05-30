function checkCountry() {
	getStats(document.getElementById("countryCode").value);
	document.getElementById("statsHere").innerHTML = "COVID-19 Statistics in " + getCountryName(document.getElementById("countryCode").value);
}

// Get user's country
var countryCode = 0;
$.get("https://ipinfo.io/json", function(data) {
	countryCode = data["country"];
	document.getElementById("statsHere").innerHTML = "COVID-19 Statistics in " + getCountryName(countryCode);
});

function getStats(countryCode) {
	$.get("https://api.covid19api.com/summary", function(data) {
		data["Countries"].forEach(function(item, index) {
			if(item["CountryCode"] == countryCode) {
		                var hereNew = item["NewConfirmed"];
		                var hereTotal = item["TotalConfirmed"];
		                var hereNewDeaths = item["NewDeaths"];
		                var hereTotalDeaths = item["TotalDeaths"];
		                document.getElementById("hereNewCases").innerHTML = hereNew + " new cases today";
		                document.getElementById("hereTotalCases").innerHTML = hereTotal + " total cases";
		                document.getElementById("hereNewDeaths").innerHTML = hereNewDeaths + " new deaths today";
		                document.getElementById("hereTotalDeaths").innerHTML = hereTotalDeaths + " total deaths";
		        }
		});
	});
}

// Get COVID stats
$.get("https://api.covid19api.com/summary", function(data) {
	var worldwideNew = data["Global"]["NewConfirmed"];
	var worldwideTotal = data["Global"]["TotalConfirmed"];
	var worldwideNewDeaths = data["Global"]["NewDeaths"];
	var worldwideTotalDeaths = data["Global"]["TotalDeaths"];
	document.getElementById("worldwideNewCases").innerHTML = worldwideNew + " new cases today";
	document.getElementById("worldwideTotalCases").innerHTML = worldwideTotal + " total cases";
	document.getElementById("worldwideNewDeaths").innerHTML = worldwideNewDeaths + " new deaths today";
	document.getElementById("worldwideTotalDeaths").innerHTML = worldwideTotalDeaths + " total deaths";
	data["Countries"].forEach(function(item, index) {
		while(countryCode == 0) {}
		getStats(countryCode);
	});	
});
