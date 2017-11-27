var express = require("express");
var bodyParser = require("body-parser");

var app = express();

//Allows flexibility in what port is being used when it is pushed to a live environment (such as Heroku)
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Requires the various routing files for displaying home, the survey, and the entire data list. 
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});