var GLOBALS = require('../config-globals')
var loginController = require('./login.controller.js')
var homeController = require('./home.controller.js')
var setupController = require('./setup.controller.js')
var tagController = require('./tag.controller.js')
var dataController = require('./data.controller.js')
var aboutController = require('./profile.controller.js')
var navigationController = require('./navigation.controller.js')
var profileController = require('./profile.controller.js')

angular.module(GLOBALS.APP_NAME)
		.controller("LoginController", loginController)
		.controller("HomeController", homeController)
		.controller("SetupController", setupController)
		.controller("TagController", tagController)
		.controller("DataController", dataController)
		.controller("AboutController", aboutController)
		.controller("NavigationController", navigationController)
		.controller("ProfileController", profileController)
		.factory('authInterceptor', function ($rootScope, $q, $window) {
		  return {
		    request: function (config) {
		      config.headers = config.headers || {};
		      if (localStorage.token) {
		      	console.log("Authentication is called!");
		        config.headers.Authorization = 'Bearer ' + localStorage.token;
		      } 
		      return config;
		    },
		    responseError: function (response) {
		      if (response.status === 401 || response.status === 403) {
		        console.log("User is not registered!");
		      }
		      return $q.reject(response);
		    }
		  };
		})