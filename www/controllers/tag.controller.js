TagController.$inject = ['$scope', '$state', 'UserService']
function TagController($scope, $state, UserService){
  $scope.addTag = function(){
    UserService.addTag($scope.formData.machineID, $scope.formData.tagName)
  } 
}

module.exports = TagController;