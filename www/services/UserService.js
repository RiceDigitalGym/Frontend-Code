'use strict';
UserService.$inject = ['$http', 'APP_CONFIG']
function UserService($http, APP_CONFIG){
	this.logout = function(id){
		return $http.post(APP_CONFIG.API_ENDPOINT + "/logout", {userId: id}).then(function(response){
      		return response.data
    	})
	}
	this.updateUser = function(name, id, gender){
		return $http.post(APP_CONFIG.API_ENDPOINT+ "/addemailgender", {name: name, userId: id, gender: gender}).then(function(response){
      		console.log(response.data)
      		return response.data
    	})
	}
	this.addName = function(name, id){

		return $http.post(APP_CONFIG.API_ENDPOINT+ "/addname", {name: name, userId: id}).then(function(response){
          return response.data
       })
	}
	this.getLastWorkout = function(){
		return $http.get(APP_CONFIG.API_ENDPOINT + "/get_last_workout").then(function(response){
			return response.data
		})
	}
	this.history = function(id){
		return $http.post(APP_CONFIG.API_ENDPOINT+ "/history", {userId: id}).then(function(response){
			return response.data
		})
	}	
}
module.exports = UserService