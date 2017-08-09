picturecontroller.$inject = ["$scope", "UserService","$state","$ionicPopup"]

function picturecontroller($scope, UserService, $state, $ionicPopup) {

    $scope.changepicture = function(src){
        UserService.changeprofilepicture(localStorage.userId,src).then(function(response){
                    if (response.status == "success"){
                        localStorage.profilepicture = src;
                        var alertPopup = $ionicPopup.alert({
                            title: 'Picture Changed',
                        });
                        $state.go('main')
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                        });
                    }
                })    
        }

    $scope.back  = function() {
        $state.go('main');
    }
}


module.exports = picturecontroller;
