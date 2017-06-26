'use strict';
DataService.$inject = ['$http', 'APP_CONFIG']
function DataService($http, APP_CONFIG){
	this.getLastData = function(id){
		return $http.get(APP_CONFIG.API_ENDPOINT + "/data/last").then(function(list) {
			return list.data
		})
	}
}
module.exports = DataService
