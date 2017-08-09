LoginController.$inject = ['$scope', '$state', 'UserService','$ionicPopup']

function LoginController ($scope, $state, UserService,$ionicPopup) {
    
    $scope.forgotPassword  = function() {
        $state.go('forgotpassword');
    }
    
     $scope.back  = function() {
        $state.go('home');
    }
    
    $scope.submitLogin  = function() {
        if ($scope.formData.email && $scope.formData.password) {
            UserService.login($scope.formData.email, $scope.formData.password).then(function(response) {
                if (response.token) {
                    localStorage.token = response.token;
                    localStorage.name = response.userName;
                    console.log("UserID at login: " + response.userID);
                    localStorage.userID = response.userID;
                    console.log("UserID at login from localStorage: " + localStorage.userID);
                    localStorage.email = response.email;
                    localStorage.profilepicture = response.image;

                    $state.go('main');
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
