HomeController.$inject = ["$scope", "$timeout", "$state", "SessionService", "$http"]

function HomeController($scope, $timeout, $state, SessionService, $http) {

    $scope.goToSetup = function() {
        $state.go('setup');
    }
    $scope.goToLogin = function() {
        $state.go('login');
    }

}

module.exports = HomeController;
