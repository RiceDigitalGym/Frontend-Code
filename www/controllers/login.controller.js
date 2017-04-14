LoginController.$inject = ['$scope', '$state', 'UserService']
function LoginController($scope, $state, UserService){
  $scope.submitName  = function(){
    if($scope.formData.name){

      localStorage.name = $scope.formData.name
      //Adding name to database and going to next page
      UserService.addName($scope.formData.name, localStorage.userId).then(function(response){
          if(response.status == "success"){
              $state.go('email')
          }
      })
    }
  } 
}

module.exports = LoginController;