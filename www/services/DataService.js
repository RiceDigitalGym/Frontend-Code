'use strict';

DataService.$inject = ['$http', 'APP_CONFIG', '$state']

function DataService($http, APP_CONFIG, $state) {

	this.getLastData = function() {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/data/last").then(function(list) {
			return list.data
		})
	}

}

module.exports = DataService;
