TagController.$inject = ['$scope', '$state', 'UserService']

function TagController($scope, $state, UserService) {

    $scope.checkTag = function() {
        
        UserService.checkTag($scope.formData.machineID, $scope.formData.tagName).then(function(response) {
            if (response.status == "success") {
                return "Tag has been registered!";
                $state.go('tab.dash');
            } 
            else {
                return "Tag was not registered!";
                $state.go('tab.data');
            } 
        })
        
       //  var iterations = 0
      	// while (iterations < 6) {
      	// 	UserService.checkTag($scope.formData.machineID, $scope.formData.tagName).then(function(response) {
       //  		if (response.status == "success") {
       //  			return "Tag has been registered!";
       //  		}
       //  		else {
       //  			setTimeout(function() {
       //  				iterations++
       //  			}, 5000)    			
       //  		}
       //  	})
      	// }

    }

}

module.exports = TagController;