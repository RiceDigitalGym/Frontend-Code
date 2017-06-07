'use strict';
SessionService.$inject = ['$http', 'APP_CONFIG']
function SessionService($http, APP_CONFIG){
	this.getAverageDuration = function(){
		return $http.get(APP_CONFIG.API_ENDPOINT + "/average_duration").then(function(duration){
    		return duration.data
  		})
	}
	this.getWorkoutDuration = function(){
		return $http.get(APP_CONFIG.API_ENDPOINT + "/workout_duration").then(function(duration){
			return duration.data
 		 })
	}
	this.listen = function(){
		return $http.get(APP_CONFIG.API_ENDPOINT + "/sessionlisten").then(function(list) {
			return list.data
		});
	}
}
module.exports = SessionService