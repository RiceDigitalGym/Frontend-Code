NavigationController.$inject = ["$scope", 'UserService', '$state']
function NavigationController($scope, UserService, $state) {
 $scope.logout  = function(){
    //This function sends a logout request to the server for a specific userId.
    UserService.logout(localStorage.userID).then(function(response){
      $state.go("home")
    })
  }
}

module.exports = NavigationController;
