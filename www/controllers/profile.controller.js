ProfileController.$inject = ["$scope", "UserService", "$state"]

function ProfileController ($scope, UserService, $state) {
   
    $scope.changePassword = function() { 
        $state.go('changepassword');
    }

    $scope.registerTag = function() {
        $state.go('tag');
    }
    
  	//Set display name
    $scope.name = localStorage.name;
    if (!$scope.name) {
        $scope.name = "undefined";
    }

    //getting past workout data for user
    $scope.history = []
    UserService.history(localStorage.userID).then(function(history) {
    	$scope.history = history.filter(function(workout) {
            return workout.average_rpm != 0.00;
        }).sort(function(a, b) {
            console.log("THIS IS A: " + a.start);
            console.log("THIS IS B: " + b.start);
            console.log("THIS IS B - A: " + (parseInt(b.start) - parseInt(a.start)));
            return parseInt(b.start) - parseInt(a.start);
        });
    })

    $scope.lastworkout = "";
    UserService.getLastWorkout(localStorage.userID).then(function(response) {
        console.log("Status: " + response.status)
        if (response.status == "success") {
            $scope.lastworkout = response.date;
            // var dateTime = moment(parseInt(response.time)).tz(moment.tz.guess()).format("dddd, MMMM Do, h:mm A");
            // $scope.lastworkout = dateTime;
        } else {
            $scope.lastworkout = "No recent workouts found.";
        }
    })

}

module.exports = ProfileController;
