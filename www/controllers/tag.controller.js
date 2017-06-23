TagController.$inject = ['$scope', '$state', 'UserService']
function TagController($scope, $state, UserService) {
  // $scope.checkTag = function(){
  //   UserService.checkTag($scope.formData.machineID, $scope.formData.tagName).then(function(response) {
  //     if (response.status == "success") {
  //       return "Tag has been registered!"
  //     } else {
  //       return "Tag is already registered!"
  //     }
  //   })
  // }
  $scope.checkTag = function() {
  	var iterations = 0

  	while (iterations < 6) {
  		UserService.checkTag($scope.formData.machineID, $scope.formData.tagName).then(function(response) {
    		if (response.status == "success") {
    			return "Tag has been registered!"
    		}
    		else {
    			setTimeout(function() {
    				iterations++
    			}, 5000)
    		}
    	})
  	}
  $state.go("tab.data")
  }
}
module.exports = TagController;
