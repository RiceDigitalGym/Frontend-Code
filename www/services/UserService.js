'use strict';
UserService.$inject = ['$http', 'APP_CONFIG', '$state']
function UserService($http, APP_CONFIG, $state){
	this.setupAccount = function(id, name, email, password) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/setup_account", {userID: id, name: name, email: email, password: password}).then(function(response) {
			if (response.status === 401 || response.status === 403 || response.status === 400)
      			$state.go('home');
			return response.data
		})
	}
	this.login = function(email, password) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/login", {email: email, password: password}).then(function(response) {
			if (response.status === 401 || response.status === 403 || response.status === 400)
      			$state.go('home');
			return response.data
		})
	}
	this.logout = function(id){
		return $http.post(APP_CONFIG.API_ENDPOINT + "/logout", {userID: id}).then(function(response){
      		if (response.status === 401 || response.status === 403 || response.status === 400)
      			$state.go('home');
      		return response.data;
    	})
	}
	this.updateUser = function(name, id, gender){
		return $http.post(APP_CONFIG.API_ENDPOINT + "/addemailgender",
			{name: name, userID: id, gender: gender}).then(function(response){
      		if (response.status === 401 || response.status === 403 || response.status === 400)
      			$state.go('home');
      		return response.data
    	})
	}
	this.addName = function(name, id){
		return $http.post(APP_CONFIG.API_ENDPOINT + "/addname", {name: name, userID: id}).then(function(response){
			if (response.status === 401 || response.status === 403 || response.status === 400)
      			$state.go('home');
         	return response.data
        })
	}
	this.checkTag = function(machineID, tagName) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/check_tag",
			{tagName: tagName, machineID: machineID, userID: id}).then(function(response) {
			if (response.status === 401 || response.status === 403 || response.status === 400)
      			$state.go('home');
			return response.data
		})
	}
	this.getLastWorkout = function(){
		return $http.get(APP_CONFIG.API_ENDPOINT + "/get_last_workout", {userID: 10}, 
			{headers: {
				authorization: localStorage.token
			}})
			.then(function(response){
			console.log(response)
			if (response.status === 401 || response.status === 403 || response.status === 400)
      			$state.go('home');
			return response.data
		})
	}
	this.history = function(id){
		return $http.post(APP_CONFIG.API_ENDPOINT + "/history", {userID: id}).then(function(response){
			if (response.status === 401 || response.status === 403 || response.status === 400)
      			$state.go('home');
			return response.data
		})
	}
}
module.exports = UserService
