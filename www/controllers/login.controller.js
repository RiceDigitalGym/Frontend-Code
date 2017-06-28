LoginController.$inject = ['$scope', '$state', 'UserService','$ionicPopup']

function LoginController ($scope, $state, UserService,$ionicPopup) {
    
    $scope.submitLogin  = function() {
        if ($scope.formData.email && $scope.formData.password) {
            UserService.login($scope.formData.email, $scope.formData.password).then(function(response) {
                if (response.token) {
                    // console.log(response.token)
                    localStorage.token = response.token;
                    localStorage.userID = response.token.userID;
                    localStorage.name = response.token.username;
                    localStorage.email = response.token.email;
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
