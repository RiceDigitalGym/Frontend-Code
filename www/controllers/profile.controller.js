ProfileController.$inject = ["$scope", "UserService","$state"]

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
            return workout.average_rpm != undefined;
        });
    })

    $scope.lastworkout = "";
    UserService.getLastWorkout(localStorage.userID).then(function(response) {
        console.log("WORKOUT RESPONSE: " + response);
        $scope.lastworkout = response.date;
    })

}

module.exports = ProfileController;
