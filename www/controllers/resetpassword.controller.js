resetpasswordcontroller.$inject = ["$scope", "UserService","$state","$ionicPopup"]

function resetpasswordcontroller($scope, UserService, $state, $ionicPopup) {
$scope.whatisit = "Email"
$scope.typeoftext = "text"
    $scope.process = function(){
        if ($scope.whatisit == "Email"){

            UserService.resetpasswordemail($scope.formData.email).then(function(response){
            if (response.status == 200){
                var alertPopup = $ionicPopup.alert({
                    title: 'Email sent',
                });
                localStorage.resetpasswordemail = $scope.formData.email
                $scope.whatisit = "Secret Code"
                $scope.formData.email = ""
                $scope.typeoftext = "number"
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Email not found.',
                });
            }
        })
}
        else if ($scope.whatisit == "Secret Code"){
            UserService.verifysecretcode(localStorage.resetpasswordemail,$scope.formData.email).then(function(response){
            if (response.status == 200){
                var alertPopup = $ionicPopup.alert({
                    title: 'Please input a new password.',
                });
                $scope.whatisit = "New Password"
                $scope.formData.email = ""
                $scope.typeoftext = "password"
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Secret code is not correct.',
                });
            }
        })
    }
        else if ($scope.whatisit == "New Password"){
            UserService.forgotpasswordchange(localStorage.resetpasswordemail,$scope.formData.email).then(function(response){
            if (response.status == 200){
                var alertPopup = $ionicPopup.alert({
                    title: 'Password changed!',
                });
                localStorage.removeItem("resetpasswordemail");
                $state.go('login');
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                });
            }
        })
    }        

}
}

module.exports = resetpasswordcontroller;
