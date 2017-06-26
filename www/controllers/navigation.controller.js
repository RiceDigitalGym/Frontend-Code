NavigationController.$inject = ["$scope", 'UserService', '$state']
function NavigationController($scope, UserService, $state) {
 $scope.logout  = function(){
    //This function sends a logout request to the server for a specific userID.
    UserService.logout(localStorage.userID).then(function(response){
    	console.log(localStorage);
    	localStorage.token.clear();
    	console.log(localStorage);
      	$state.go("login")
    })
  }
}

module.exports = NavigationController;
