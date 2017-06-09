var GLOBALS = require('../config-globals')
var loginController = require('./login.controller.js')
var homeController = require('./home.controller.js')
var setupController = require('./setup.controller.js')
var dataController = require('./data.controller.js')
var aboutController = require('./profile.controller.js')
var navigationController = require('./navigation.controller.js')
var profileController = require('./profile.controller.js')

angular.module(GLOBALS.APP_NAME)
		.controller("LoginController", loginController)
		.controller("HomeController", homeController)
		.controller("SetupController", setupController)
		.controller("DataController", dataController)
		.controller("AboutController", aboutController)
		.controller("NavigationController", navigationController)
		.controller("ProfileController", profileController)

	