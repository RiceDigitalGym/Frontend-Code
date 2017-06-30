TagController.$inject = ['$scope', '$state', 'UserService', '$ionicPopup', '$interval']

function TagController($scope, $state, UserService, $ionicPopup, $interval) {

    $scope.registered = false;

    $scope.checkTag = function() {
        $interval(function() {
            if (!$scope.registered) {
                UserService.checkTag($scope.formData.tagName, $scope.formData.machineID, localStorage.userID).then(function(response) {
                    if (response.status == "success") {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Tag has been registered.'
                        });
                        $scope.registered = true;
                        $state.go('tab.dash');
                    } else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Tag has not been registered. Please attempt again.'
                        });
                    } 
                })
            }
        }, 2000, 5);
    }
}

module.exports = TagController;