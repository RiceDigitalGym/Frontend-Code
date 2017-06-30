TagController.$inject = ['$scope', '$state', 'UserService', '$ionicPopup', '$interval']

function TagController($scope, $state, UserService, $ionicPopup, $interval) {

    $scope.showLoading = false;
    $scope.registered = false;
    $scope.count = 0;

    $scope.checkTag = function() {
        $scope.showLoading = true;
        $interval(function() {
            $scope.count++;
            if (!$scope.registered) {
                UserService.checkTag($scope.formData.tagName, $scope.formData.machineID, localStorage.userID).then(function(response) {
                    if (response.status == "success") {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Tag has been registered.'
                        });
                        $scope.registered = true;
                        $state.go('tab.dash');
                    } else if ($scope.count == 5) {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Tag has not been registered. Please attempt again.'
                        });
                    }
                })
            }
        }, 2000, 5);
        $scope.showLoading = false;
    }
}

module.exports = TagController;