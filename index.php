<!DOCTYPE html>
<html>
	<head>
		<title>PizzaPolice (Alpha)</title>
		<link rel="stylesheet" href="style.css">
	</head>
	<body>
		<div class="header">
			<h1>PizzaPolice Alpha</h1>
		</div>
		<div class="content">
			<h2>COVID-19 Statistics Worldwide</h2>
			<p id="worldwideNewCases"></p><br>
			<p id="worldwideTotalCases"></p><br>
			<p id="worldwideNewDeaths"></p><br>
			<p id="worldwideTotalDeaths"></p><br>
			<h2>COVID-19 Statistics Here</h2>
			<p id="hereNewCases"></p><br>
			<p id="hereTotalCases"></p><br>
			<p id="hereNewDeaths"></p><br>
			<p id="hereTotalDeaths"></p><br>
		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
		<script>
			$.get("https://ipinfo.io/json", function(data) {
				console.log(data);
				alert(data);
			});
		</script>
	</body>
</html>
