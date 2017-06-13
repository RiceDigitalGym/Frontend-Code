LoginController.$inject = ['$scope', '$state', 'UserService']
function LoginController($scope, $state, UserService){
  $scope.submitLogin  = function(){
    if($scope.formData.email && $scope.formData.password) {

      UserService.login($scope.formData.email, $scope.formData.password).then(function(response) {
        if (response.status == "success") {
          localStorage.userId = response.user.id
          localStorage.name = response.user.name
          localStorage.email = response.user.email
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