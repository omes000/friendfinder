//Requires the saved data. 
var friendsData = require("../data/friends");

module.exports = function(app){
	//Displays the friends data in JSON format. 
	app.get("/api/friends", function(req, res){
		res.json(friendsData);
	});

	//Takes the input from the user and determines the closest friend. 
	app.post("/api/friends", function(req, res){
		//Pushes the inputted data to the friends data array. 
		friendsData.push(req.body);

		var diffArray = []; //stores the total differences between the current user and all previous users. 
		var indexFriend = -1; //stores the index of the user with the lowest difference. 

		//This is run only if there is more than one user input data saved in the friends data array. 
		if(friendsData.length > 1){

			//Runs from the beginning of the array to the second to last element since the last element is the current user's data.
			for(var i = 0; i < friendsData.length - 1; i++){
				
				var totalDifference = 0; //temporary variable that stores the total difference between users
				var difference = 0; //temporary variable that stores the question to question difference between users. 

				//Runs for the length of the number of questions. 
				for(var j = 0; j < req.body.questions.length; j++){
					//Performs the difference calcuation between current user score for specific question and all previous user scores for the same question.
					difference = (parseInt(friendsData[i].questions[j]) - parseInt(req.body.questions[j]));

					//If the difference is less than 0, then we multiply -1 to get a positive value. Attempts to use Math.abs resulted in NAN results, so this was chosen as an alternative. 
					if (difference < 0){
						difference = difference * (-1);
					}

					//adds the differences for each question. 
					totalDifference += difference;
				}
				//Pushes the total difference for each user to an array. The index of this array corresponds to a user (i.e. the 0 element in the diffArray corresponds to the difference score for the 0 element in the friends data array). 
				diffArray.push(totalDifference);
			}

			//Finds the smallest difference in the diffArray. 
			var minDiff = Math.min.apply(null,diffArray);

			//Assigns the indexFriend the index of the smallest difference element in the diffArray. If two users share a difference score, then the user that has a lower index in the friends data array is chosen. 
			indexFriend = diffArray.indexOf(minDiff);
		}

		//Sends the data back if the index of the user with the smallest difference is determined. 
		if(indexFriend > -1 ){
			res.json(friendsData[indexFriend]);
		}
	});
}