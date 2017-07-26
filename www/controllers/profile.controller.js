ProfileController.$inject = ["$scope", "UserService", "$state", "$ionicPopup"]

function ProfileController ($scope, UserService, $state, $ionicPopup) {
   
    $scope.changePassword = function() { 
        $state.go('changepassword');
    }

    
    $scope.delete = function(sessionid) {
        UserService.deleteworkout(sessionid).then(function(response){
            if (response.status == "success"){
                 $state.reload();
            }
        })
    }
    
$scope.deleteAccount = function() {
      $ionicPopup.prompt({
              title: 'Delete Account',
              subTitle: 'Please enter your password to continue.',
              inputType: 'password',
              inputPlaceholder: 'Your password'
   }).then(function(res) {
         UserService.deleteaccount(localStorage.userID,res).then(function(response){
             if (response.status == "success"){
                 localStorage.clear();
                 $state.go("home")
         }
      }
   );

    }
)
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
            return workout.sessionid
        }).sort(function(a, b) {
            return parseInt(b.start) - parseInt(a.start);
        });
    })

    $scope.lastworkout = "";
    UserService.getLastWorkout(localStorage.userID).then(function(response) {
        // console.log("Status: " + response.status)
        if (response.status == "success") {
            $scope.lastworkout = response.date;
            // var dateTime = moment(parseInt(response.time)).tz(moment.tz.guess()).format("dddd, MMMM Do, h:mm A");
            // $scope.lastworkout = dateTime;
        } else {
            $scope.lastworkout = "No recent workouts found.";
        }
    })

}


module.exports = ProfileController
