var friendsData = require("../data/friends");
var bodyParser = require("body-parser");

module.exports = function(app){
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	app.get("/api/friends", function(req, res){
		res.json(friendsData);
	});

	app.post("/api/friends", function(req, res){
		friendsData.push(req.body);
		var diffArray = [];
		var indexFriend = -1;

		if(friendsData.length > 1){
			for(var i = 0; i < friendsData.length - 1; i++){
				
				var totalDifference = 0; 
				var difference = 0;
				for(var j = 0; j < req.body.questions.length; j++){
					difference = (parseInt(friendsData[i].questions[j]) - parseInt(req.body.questions[j]));
					if (difference < 0){
						difference = difference*(-1);
					}
					totalDifference += difference;
					console.log(parseInt(friendsData[i].questions[j]));
					console.log(parseInt(req.body.questions[j]));
					
					console.log("current diff: " + difference);
				}

				console.log("total Diff " + i + ": " + totalDifference);
				diffArray.push(totalDifference);
				console.log(diffArray);

			}
			var minDiff = Math.min.apply(null,diffArray);
			console.log("min diff: " + minDiff);
			indexFriend = diffArray.indexOf(minDiff);

			console.log(indexFriend);

		}
		if(indexFriend > -1 ){
			res.json(friendsData[indexFriend]);
		}
		
	});
}