'use strict';

DataService.$inject = ['$http', 'APP_CONFIG', '$state']

function DataService($http, APP_CONFIG, $state) {
	
	this.getLastData = function() {
		return $http.get(APP_CONFIG.API_ENDPOINT + "/data/last").then(function(response) {
			return response.data
		})
	}

}

module.exports = DataService;