AboutController.$inject = ['$scope']

function AboutController($scope) {
	$scope.settings = {
    	enableFriends: true
  	};
}

module.exports = AboutController;