'use strict';

DataService.$inject = ['$http', 'APP_CONFIG', '$state']

function DataService($http, APP_CONFIG, $state) {

	this.getLastData = function(userID) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/data/last", {userID: userID}).then(function(list) {
			console.log("list data",list.data);
			return list.data
		})
	}

}

module.exports = DataService;
