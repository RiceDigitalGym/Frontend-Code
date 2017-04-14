EmailController.$inject = ["$scope", "$state", "UserService"]

function EmailController($scope, $state, UserService){

  //Really dumb way to create this multiple choice gender selection. Could be more elegant.
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

    

  }
}


module.exports = EmailController;