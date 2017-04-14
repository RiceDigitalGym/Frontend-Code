ProfileController.$inject = ["$scope"]
function ProfileController($scope) {

  	//Set display name
    $scope.name = localStorage.name
    if(!$scope.name){
      $scope.name = "undefined"
    }

}

module.exports = ProfileController;