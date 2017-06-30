TagController.$inject = ['$scope', '$state', 'UserService', '$ionicPopup', '$timeout']

function TagController($scope, $state, UserService, $ionicPopup, $timeout) {

    $scope.checkTag = function() {

        var stopLoop = false;

        for (var i = 0; i < 5; i++) {

            UserService.checkTag($scope.formData.tagName, $scope.formData.machineID, localStorage.userID).then(function(response) {
                console.log("checkTag status: " + response.status);
                if (response.status == "success") {
                    console.log("Inside if statement.");
                    var alertPopup = $ionicPopup.alert({
                        title: 'Tag has been registered.'
                    });
                    console.log(1)
                    stopLoop = true;
                    console.log(2);
                } 
                else {
                    console.log("Inside else statement.");
                    console.log(3);
                    var alertPopup = $ionicPopup.alert({
                        title: 'Tag has not been registered. Please attempt again.'
                    });
                    console.log(4);
                }
            })

            if (stopLoop) {
                console.log(5);
                $state.go('tab.dash');
                console.log(6);
                return;
                console.log(7);
            }
            else {
                console.log(8);
                $timeout(5000);
                console.log(9);
            }

        }

    }

}

module.exports = TagController;