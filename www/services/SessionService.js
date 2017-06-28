'use strict';

SessionService.$inject = ['$http', 'APP_CONFIG', '$state']

function SessionService($http, APP_CONFIG, $state) {
	
	this.getAverageDuration = function() {
		return $http.get(APP_CONFIG.API_ENDPOINT + "/average_duration").then(function(duration) {
			if (response.status === 401 || response.status == 403 || response.status === 400)
      			$state.go('/home');
    		return duration.data
  		})
	}

	this.getWorkoutDuration = function() {
		return $http.get(APP_CONFIG.API_ENDPOINT + "/workout_duration").then(function(duration) {
			if (response.status === 401 || response.status == 403 || response.status === 400)
      			$state.go('/home');
			return duration.data
		})
	}
	
	this.listen = function() {
		return $http.get(APP_CONFIG.API_ENDPOINT + "/sessionlisten").then(function(list) {
			if (response.status === 401 || response.status == 403 || response.status === 400)
      			$state.go('/home');
			return list.data
		});
	}

}

module.exports = SessionService;
