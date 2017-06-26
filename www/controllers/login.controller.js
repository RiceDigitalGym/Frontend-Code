LoginController.$inject = ['$scope', '$state', 'UserService']
function LoginController($scope, $state, UserService){
  $scope.submitLogin  = function(){
    if($scope.formData.email && $scope.formData.password) {

      UserService.login($scope.formData.email, $scope.formData.password).then(function(response) {
<<<<<<< HEAD
        if (response.status == "success") {
          localStorage.userID = response.user.id
          localStorage.name = response.user.name
          localStorage.email = response.user.email
=======
        if (response.token) {
          console.log(response.token)
          localStorage.token = response.token
          localStorage.userID = response.token.userID
          localStorage.name = response.token.username
          localStorage.email = response.token.email
>>>>>>> 78a8f4456370634874eaf7e15d9b40acbdaa3dce
          $state.go('tab.data')
        }
        else {
          window.alert("Incorrect email or password entered.")
        }
      })

    }
  }
}

module.exports = LoginController;
