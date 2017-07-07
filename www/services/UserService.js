'use strict';

UserService.$inject = ['$http', 'APP_CONFIG', '$state']

function UserService($http, APP_CONFIG, $state){

	this.setupAccount = function(id, name, email, password) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/setup_account", {userID: id, name: name, email: email, password: password}).then(function(response) {
			console.log("Response Status: " + response.status);
			return response.data;
		})
	}

	this.login = function(email, password) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/login", {email: email, password: password}).then(function(response) {
			console.log("Response Status: " + response.status);
			return response.data;
		})
	}

    this.forgotpasswordchange = function(email,password){
        return $http.post(APP_CONFIG.API_ENDPOINT + "/forgotpasswordchange", {email: email,password:password}).then(function(response) {
      		console.log("Response Status: " + response.status);
      		return response.data
    	}) 
    }
    
    this.resetpasswordemail = function(email){
       return $http.post(APP_CONFIG.API_ENDPOINT + "/sendresetpassword", {email: email,}).then(function(response) {
      		console.log("Response Status: " + response.status);
      		return response.data
    	})
    } 
    
    this.verifysecretcode = function(email,code){
       return $http.post(APP_CONFIG.API_ENDPOINT + "/verifysecretcode", {email: email, secretcode: code}).then(function(response) {
      		console.log("Response Status: " + response.status);
      		return response.data
    	})
    } 
    
    this.changepassword = function(id,oldpass,newpass) {
        return $http.post(APP_CONFIG.API_ENDPOINT + "/changepassword", {userId: id, oldpw: oldpass, newpw: newpass}).then(function(response) {
      		console.log("Response Status: " + response.status);
      		return response.data
    	})
    }

	this.logout = function(id) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/logout", {userID: id}).then(function(response) {
			console.log("Response Status: " + response.status);
      		return response.data;
    	})
	}

	this.updateUser = function(name, id, gender) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/addemailgender", {name: name, userID: id, gender: gender}).then(function(response) {
			console.log("Response Data Status: " + response.data.status);
			console.log("Response Status: " + response.status);
      		return response.data
    	})
	}

	this.addName = function(name, id) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/addname", {name: name, userID: id}).then(function(response) {
         	console.log("Response Status: " + response.status);
         	return response.data
        })
	}

	this.checkTag = function(tagName, machineID, id) {
		console.log("UserID in login Service: " + id);
		return $http.post(APP_CONFIG.API_ENDPOINT + "/check_tag", {tagName: tagName, machineID: machineID, userID: id}).then(function(response) {
			console.log("Response Status: " + response.status);
			return response.data
		})
	}

	this.getLastWorkout = function(id) {
		return $http.get(APP_CONFIG.API_ENDPOINT + "/get_last_workout", {userID: id}).then(function(response) {
			console.log("Response Status: " + response.status);
			return response.data
		})
	}

	this.history = function(id) {
		return $http.post(APP_CONFIG.API_ENDPOINT + "/history", {userID: id}).then(function(response) {
			console.log("Response Status: " + response.status);
			return response.data
		})
	}

}

module.exports = UserService;
