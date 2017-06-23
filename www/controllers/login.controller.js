LoginController.$inject = ['$scope', '$state', 'UserService']
function LoginController($scope, $state, UserService){
  $scope.submitLogin  = function(){
    if($scope.formData.email && $scope.formData.password) {

      UserService.login($scope.formData.email, $scope.formData.password).then(function(response) {
        if (response.token) {
          console.log(response.token)
          localStorage.token = response.token
          localStorage.userId = response.token.userID
          localStorage.name = response.token.username
          localStorage.email = response.token.email
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