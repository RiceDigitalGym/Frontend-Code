TagController.$inject = ['$scope', '$state', 'UserService', '$ionicPopup', '$interval']

function TagController($scope, $state, UserService, $ionicPopup, $interval) {

    $scope.showLoading = false;
    

    $scope.checkTag = function() {
        $scope.showLoading = true;
        $scope.registered = false;
        $scope.count = 0;

        if ($scope.formData == undefined ) {
            $scope.showLoading = false;
            var alertPopup = $ionicPopup.alert({
                        title: 'Please input both fields!'
            });
        }
        else if ($scope.formData.tagName == undefined || $scope.formData.machineID == undefined) {
            $scope.showLoading = false;
            var alertPopup = $ionicPopup.alert({
                    title: 'Please input both fields!'
            });
        }
        else {
            $interval(function() {
                $scope.count++;
                if (!$scope.registered) {
                    console.log("UserID from tag controller: " + localStorage.userID);
                    UserService.checkTag($scope.formData.tagName, $scope.formData.machineID, localStorage.userID).then(function(response) {
                        if (response.status == "success") {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Tag has been registered.'
                            });
                            $scope.registered = true;
                            $state.go('tab.dash');
                        } else if ($scope.count == 5) {
                            $scope.count = 0;
                            var alertPopup = $ionicPopup.alert({
                                title: 'Tag has not been registered. Please attempt again.'
                            });
                        }
                    })
                }
            }, 2000, 5).then(function() {
                $scope.showLoading = false;
            });
        }
    }
}

module.exports = TagController;



// TODO: 
// $scope.formData does not exist if the user provides no input into the "Tag Name" and "Machine ID"
// text fields! Code should be debugged so that an ionicPopup "Tag has not been registered. Please attempt again."
// occurs in this case (no input provided and the loading icon times out.)