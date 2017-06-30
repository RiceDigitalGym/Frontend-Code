TagController.$inject = ['$scope', '$state', 'UserService', '$ionicPopup', '$interval']

function TagController($scope, $state, UserService, $ionicPopup, $interval) {

    $scope.showLoading = false;
    

    $scope.checkTag = function() {
        console.log("1");
        $scope.showLoading = true;
        $scope.registered = false;
        $scope.count = 0;
        console.log("showLoading: " + $scope.showLoading);
        console.log("2");
        $interval(function() {
            console.log("3");
            $scope.count++;
            // console.log("Count: " + $scope.count);
            console.log("4");
            if (!$scope.registered) {
                console.log("Enters the If");
                UserService.checkTag($scope.formData.tagName, $scope.formData.machineID, localStorage.userID).then(function(response) {
                    console.log("Enters checktag function");
                    console.log("Count: " + $scope.count);
                    console.log("Response: " + response.status);
                    if (response.status == "success") {
                        console.log("5");
                        var alertPopup = $ionicPopup.alert({
                            title: 'Tag has been registered.'
                        });
                        console.log("6");
                        $scope.registered = true;
                        console.log("7");
                        $state.go('tab.dash');
                    } else if ($scope.count == 5) {
                        console.log("8");
                        $scope.count = 0;
                        var alertPopup = $ionicPopup.alert({
                            title: 'Tag has not been registered. Please attempt again.'
                        });
                    }
                })
            }
        }, 2000, 5).then(function() {
            console.log("9");
            $scope.showLoading = false;
            console.log("10");
            console.log("11");
            console.log("showLoading: " + $scope.showLoading);
        });
    }
}

module.exports = TagController;