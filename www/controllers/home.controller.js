HomeController.$inject = ["$scope", "$state"]

function HomeController($scope, $state) {
    
    
    $scope.goToSetup = function() {
        $state.go('setup');
    }
    $scope.goToLogin = function() {
        $state.go('login');
    }

}

module.exports = HomeController;
