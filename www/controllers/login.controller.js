LoginController.$inject = ['$scope', '$state', 'UserService']
function LoginController($scope, $state, UserService){
  $scope.submitLogin  = function(){
    if($scope.formData.email && $scope.formData.password) {

      localStorage.email = $scope.formData.email    
      //Adding name to database and going to next page
      UserService.addName($scope.formData.email, localStorage.userId).then(function(response){
          if(response.status == "success"){
              $state.go('email')
          }
      })
    }
  } 
}

module.exports = LoginController;