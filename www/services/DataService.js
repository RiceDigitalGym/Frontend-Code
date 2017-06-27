'use strict';
DataService.$inject = ['$http', 'APP_CONFIG', '$state']
function DataService($http, APP_CONFIG, $state){
	this.getLastData = function(){
		return $http.get(APP_CONFIG.API_ENDPOINT + "/data/last").then(function(list) {
			//console.log(list)
			if (response.status === 401 || response.status === 403 || response.status === 400)
      			$state.go('/home');
			return list.data
		})
	}
}
module.exports = DataService