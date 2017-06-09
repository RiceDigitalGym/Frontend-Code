LoginController.$inject = ['$scope', '$state', 'UserService']
function LoginController($scope, $state, UserService){
  $scope.submitLogin  = function(){
    if($scope.formData.username && $scope.formData.password) {

      localStorage.name = $scope.formData.username    
      //Adding name to database and going to next page
      UserService.addName($scope.formData.username, localStorage.userId).then(function(response){
          if(response.status == "success"){
              $state.go('email')
          }
      })
    }
  } 
}

module.exports = LoginController;