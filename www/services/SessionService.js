'use strict';

SessionService.$inject = ['$http', 'APP_CONFIG', '$state']

function SessionService($http, APP_CONFIG, $state) {

	this.getAverageDuration = function(userID) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/average_duration", {userID: userID}).then(function(duration) {
				return duration.data
  		})
	}

	this.getWorkoutDuration = function(userID) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/workout_duration", {userID: userID}).then(function(duration) {
			return duration.data
		})
	}

	this.checkActiveSession = function(userID) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/check_active_session", {userID: userID}).then(function(active) {
			return active.data
		})
	}

	this.listen = function() {
		return $http.get(APP_CONFIG.API_ENDPOINT + "/sessionlisten").then(function(list) {
			return list.data
		});
	}

}

module.exports = SessionService;
