ProfileController.$inject = ["$scope", "UserService","$state"]

function ProfileController ($scope, UserService, $state) {
   
    $scope.changePassword = function() { 
        $state.go('changepassword');
    }
    
  	//Set display name
    $scope.name = localStorage.name;
    if (!$scope.name) {
        $scope.name = "undefined";
    }

    //getting past workout data for user
    $scope.history = []
    UserService.history(localStorage.userID).then(function(history) {
    	// console.log(history);
    	// console.log("response");
    	$scope.history = history;
    })

    // function getLastWorkout() {
    //     var most_recent_date = NUMBER.NEGATIVE_INFINITY
    //     for (workout in $scope.history) {
    //         var date = Date.parse(history[inc].createdAt)
    //         if (date > most_recent_date) {
    //             most_recent_date = date
    //         }
    //     }
    //     if (most_recent_date != NUMBER.NEGATIVE_INFINITY) {
    //         return (new Date(most_recent_date)).toDateString()
    //     }
    //     else {
    //         return "No recent workouts found."
    //     }
    // }

    $scope.lastworkout = "";
    UserService.getLastWorkout().then(function(response) {
        // console.log("Last workout response status: " + response.status);
        // if (response.status === 401 || response.status == 403 || response.status === 400)
        //     $state.go('home');
        $scope.lastworkout = response.date;
    })

}

module.exports = ProfileController;
