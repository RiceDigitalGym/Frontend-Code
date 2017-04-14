ProfileController.$inject = ["$scope", "UserService"]
function ProfileController($scope, UserService) {

  	//Set display name
    $scope.name = localStorage.name
    if(!$scope.name){
      $scope.name = "undefined"
    }

    //getting past workout data for user
    $scope.history = []
    UserService.history(localStorage.userId).then(function(history){
    	console.log(history)
    	console.log("response")
    	$scope.history = history
    })


}

module.exports = ProfileController;