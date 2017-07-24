ChangePasswordController.$inject = ["$scope", "UserService","$state","$ionicPopup"]

function ChangePasswordController($scope, UserService, $state, $ionicPopup) {
    $scope.back  = function() {
        $state.go('tab.dash');
    }
    
    $scope.ChangePassword  = function(){
        UserService.changepassword(localStorage.userId,$scope.formData.oldpassword,$scope.formData.newpassword).then(function(response){
            if (response.status == "success"){
                var alertPopup = $ionicPopup.alert({
                    title: 'Password Changed',
                });
                $state.go('tab.dash')
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Incorrect Password',
                });
            }
        })
    }

}

module.exports = ChangePasswordController;