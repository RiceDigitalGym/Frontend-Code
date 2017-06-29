TagController.$inject = ['$scope', '$state', 'UserService']

function TagController($scope, $state, UserService) {

    $scope.checkTag = function() {
        
        UserService.checkTag($scope.formData.machineID, $scope.formData.tagName, localStorage.userID).then(function(response) {
            console.log("checkTag has been called - status is: " + response.status);
            if (response.status == "success") {
                // $state.go('tab.dash');
            } 
            else {
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