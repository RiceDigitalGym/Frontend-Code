SetupController.$inject = ["$scope", "$state", "UserService","$ionicPopup"]

function SetupController($scope, $state, UserService,$ionicPopup) {
  
    $scope.setupAccount = function() {
        // Add more appropriate data inputs in the future!
        UserService.setupAccount($scope.formData.name, $scope.formData.email, $scope.formData.password).then(function(response) {
            if (response.status == "success") {
                localStorage.token = response.token;
                    localStorage.name = response.userName;
                    localStorage.userID = response.userID;
                    localStorage.email = response.email;
                $state.go('tab.dash');
            }
            else if (response.status == "failure"){
                var alertPopup = $ionicPopup.alert({
                    title: 'Error, account not created.',
                });
            }
            else if (response.status == "409"){
                var alertPopup = $ionicPopup.alert({
                    title: 'Account already exists.',
                });
            }
        })
    }

}

module.exports = SetupController;





// ----------------

//Really dumb way to create this multiple choice gender selection. Could be more elegant.

/*
  $scope.formData = {}
  $scope.male = "button1"
  $scope.female = "button2"
  //Switch to male display
  $scope.maleFunction = function(){
      $scope.male = "button2"
      $scope.female = "button1"
  }
  //Switch to female display
  $scope.femaleFunction = function(){
      $scope.male = "button1"
      $scope.female = "button2"
  }
  $scope.submitEmail = function(){
    var gender = ""
    if($scope.male == "button2"){
      gender = "male"
    }
    if($scope.female == "button2"){
      gender = "female"
    }
    //Store email in app data
    localStorage.email = $scope.formData.email

    //Update user with email and gender.
    UserService.updateUser($scope.formData.email, localStorage.userId, gender).then(function(response){

      if(response.status == "success"){
        console.log("Testing")
        $state.go('tab.data')
      }
    })
  */
