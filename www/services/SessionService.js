'use strict';

SessionService.$inject = ['$http', 'APP_CONFIG', '$state']

function SessionService($http, APP_CONFIG, $state) {
	
	this.getAverageDuration = function() {
		return $http.get(APP_CONFIG.API_ENDPOINT + "/average_duration").then(function(response) {
			console.log("Response Status: " + response.status);
    		return response.data
  		})
	}

	this.getWorkoutDuration = function() {
		return $http.get(APP_CONFIG.API_ENDPOINT + "/workout_duration").then(function(response) {
			console.log("Response Status: " + response.status);
			return response.data
		})
	}
	
	this.listen = function() {
		return $http.get(APP_CONFIG.API_ENDPOINT + "/sessionlisten").then(function(list) {
			console.log("Response Status: " + response.status);
			return list.data
		});
	}

}

module.exports = SessionService;
