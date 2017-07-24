resetpasswordcontroller.$inject = ["$scope", "UserService","$state","$ionicPopup"]

function resetpasswordcontroller($scope, UserService, $state, $ionicPopup) {
$scope.whatisit = "Email"
$scope.typeoftext = "text"
var clicked = false;

    $scope.back  = function() {
        $state.go('login');
    }

    $scope.process = function(){
        if ($scope.whatisit == "Email" && clicked == false){
            clicked = true
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
        clicked = false
}
        else if ($scope.whatisit == "Secret Code" && clicked == false){
            clicked = true
            UserService.verifysecretcode(localStorage.resetpasswordemail,$scope.formData.email).then(function(response){
            if (response.status == 200){
                var alertPopup = $ionicPopup.alert({
                    title: 'Please input a new password.',
                });
                localStorage.secretcode = $scope.formData.email
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
            clicked = false
    }
        else if ($scope.whatisit == "New Password" && clicked == false){ 
           clicked = true
UserService.forgotpasswordchange(localStorage.resetpasswordemail,$scope.formData.email,localStorage.secretcode).then(function(response){
            if (response.status == 200){
                var alertPopup = $ionicPopup.alert({
                    title: 'Password changed!',
                });
                localStorage.removeItem("resetpasswordemail");
                localStorage.removeItem("secretcode");
                $state.go('login');
            }
            else {
                var alertPopup = $ionicPopup.alert({
                    title: 'Error',
                });
            }
        })
    clicked = false
    }        

}
}

module.exports = resetpasswordcontroller;
