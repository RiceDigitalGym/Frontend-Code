LoginController.$inject = ['$scope', '$state', 'UserService','$ionicPopup']

function LoginController ($scope, $state, UserService,$ionicPopup) {
    
    $scope.forgotPassword  = function() {
        $state.go('forgotpassword');
    }
    
    $scope.submitLogin  = function() {
        if ($scope.formData.email && $scope.formData.password) {
            UserService.login($scope.formData.email, $scope.formData.password).then(function(response) {
                if (response.token) {
                    localStorage.token = response.token;
                    localStorage.name = response.userName;
                    localStorage.userID = response.userID;
                    localStorage.email = response.email;
                    $state.go('tab.data');
                }
                else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Incorrect email or password entered.'
                    });
                }
            })
        }
    }

}

module.exports = LoginController;
