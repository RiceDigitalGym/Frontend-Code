TagController.$inject = ['$scope', '$state', 'UserService']

function TagController($scope, $state, UserService) {

    $scope.checkTag = function() {

        for (var i = 0; i < 5; i++) {

            UserService.checkTag($scope.formData.tagName, $scope.formData.machineID, localStorage.userID).then(function(response) {
                if (response.status == "success") {
                    var alertPopup = $ionicPopup.alert({
                            title: 'Tag has been registered.'
                        });
                    $state.go('tab.dash');
                } 
                else {
                    var alertPopup = $ionicPopup.alert({
                            title: 'Tag has not been registered. Please attempt again.'
                        });
                } 
            })

            $timeout(2000);

        }

    }

}

module.exports = TagController;