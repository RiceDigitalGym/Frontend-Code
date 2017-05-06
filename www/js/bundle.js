/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var GLOBALS = {};


APP_CONFIG = {
	API_ENDPOINT : "http://52.34.141.31:8000/bbb"
    // API_ENDPOINT : "http://localhost:8000/bbb"
}


GLOBALS.APP_NAME = "DigitalGym"

module.exports = GLOBALS
angular.module(GLOBALS.APP_NAME).constant("APP_CONFIG", APP_CONFIG)

/***/ }),
/* 1 */
/***/ (function(module, exports) {

ProfileController.$inject = ["$scope", "UserService"]
function ProfileController($scope, UserService) {

  	//Set display name
    $scope.name = localStorage.name
    if(!$scope.name){
      $scope.name = "undefined"
    }

    //getting past workout data for user
    $scope.history = []
    UserService.history(localStorage.userId).then(function(history){
    	console.log(history)
    	console.log("response")
    	$scope.history = history
    })


}

module.exports = ProfileController;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var GLOBALS = __webpack_require__(0)
var loginController = __webpack_require__(7)
var homeController = __webpack_require__(6)
var emailController = __webpack_require__(5)
var dataController = __webpack_require__(4)
var aboutController = __webpack_require__(1)
var navigationController = __webpack_require__(8)
var profileController = __webpack_require__(1)

angular.module(GLOBALS.APP_NAME)
		.controller("LoginController", loginController)
		.controller("HomeController", homeController)
		.controller("EmailController", emailController)
		.controller("DataController", dataController)
		.controller("AboutController", aboutController)
		.controller("NavigationController", navigationController)
		.controller("ProfileController", profileController)

	

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GLOBALS = __webpack_require__(0);
var dataService = __webpack_require__(10)
var sessionService = __webpack_require__(11)
var userService = __webpack_require__(12)

angular
    .module(GLOBALS.APP_NAME)
    .service('DataService', dataService)
    .service('SessionService', sessionService)
    .service('UserService', userService);
    
    



/***/ }),
/* 4 */
/***/ (function(module, exports) {

DataController.$inject = ['$scope', '$timeout', '$state', 'DataService', 'UserService', 'SessionService'];

function DataController($scope, $timeout, $state, DataService, UserService, SessionService) {


  //helper function for displaying formatted time
  String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }

  //used for radial display
  $scope.gt50 = function() {
        return $scope.deg > 180
  }


  //Chart.js initialization parameters
  $scope.labels = ["0 min", "1 sec"];
  $scope.series = ['rpm'];
  $scope.data = [[0]];

  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];

  $scope.options = {
    animation: false,
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };

//Used for keeping track of current workout duration. Display purposes only. Real time is stored in server.
$scope.current_duration = 0
$scope.current_duration_formatted = "00:00:00"
 SessionService.getWorkoutDuration().then(function(duration){

    //Set the current workout duration to duration on server.
    $scope.current_duration = parseInt(duration.duration)
    $scope.current_duration_formatted = String($scope.current_duration).toHHMMSS();
    
    //This self-calling function is used to locally keep track of time.
    (function count(){
      $scope.current_duration = $scope.current_duration+1
      $scope.current_duration_formatted = String($scope.current_duration).toHHMMSS();
      $timeout(count, 1000)
    })()

  })

  //This fetches the average current duration. All computation for average duration done on the server side.
  SessionService.getAverageDuration().then(function(duration){
    if(duration.success){
      $scope.avg = duration.duration
    }
  })



$scope.$on('$ionicView.loaded', function () {
    //Requests the last data point in the database
    //Todo: Make this bike specific
     (function tick() {
      DataService.getLastData().then(function(last){
         //Set rpm, display rpm in radial view, and add datapoint to chart.
            var rpm = last.rpm
            $scope.data[0].push(rpm)
            $scope.rpm_data = [0, rpm-200, rpm]
            $scope.lastRPM = parseInt(rpm)
            $scope.deg = rpm*360.0/200.0
            $scope.labels.push("")
            if($scope.data[0].length>50){
              $scope.data[0].shift()
              $scope.labels.shift()
            }

            $timeout(tick, 500)
      })
           
 
    })();
  });
}

module.exports = DataController

/***/ }),
/* 5 */
/***/ (function(module, exports) {

EmailController.$inject = ["$scope", "$state", "UserService"]

function EmailController($scope, $state, UserService){

  //Really dumb way to create this multiple choice gender selection. Could be more elegant.
  $scope.formData = {}
  $scope.male = "button1"
  $scope.female = "button2"
  //Switch to male display
  $scope.maleFunction = function(){
      $scope.male = "button2"
      $scope.female = "button1"
  }
  //Switch to female display
  $scope.femaleFunction = function(){
      $scope.male = "button1"
      $scope.female = "button2"
  }
  $scope.submitEmail = function(){
    var gender = ""
    if($scope.male == "button2"){
      gender = "male"
    }
    if($scope.female == "button2"){
      gender = "female"
    }
    //Store email in app data
    localStorage.email = $scope.formData.email

    //Update user with email and gender.
    UserService.updateUser($scope.formData.email, localStorage.userId, gender).then(function(response){

      if(response.status == "success"){
        console.log("Testing")
        $state.go('tab.data')
      }
    })

    

  }
}


module.exports = EmailController;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

HomeController.$inject = ["$scope", "$timeout", "$state", "SessionService", "$http"]

function HomeController($scope, $timeout, $state, SessionService, $http){
  //Check to see if an RFID has been scanned every 500ms
  //$http is needed because this function is pre-evaluated
      (function tick() {
      SessionService.listen().then(function(list){
        if(list.status == "success" && list.user!=null){

            if (list.user.name == null || list.user.name == "null"){
              //If the user has not set name, direct them to do so before giving access to app.
              localStorage.userId = list.user.id
              $state.go("login")
            }
            else{
              //If the user has set their name, set user data and continue to app
              localStorage.name = list.user.name
              localStorage.email = list.user.email
              localStorage.gender = list.user.gender
              localStorage.userId = list.user.id
              //redirect
              $state.go("tab.data")
            }
          }
          else{
              $timeout(tick, 500)
          }
        
      })
    })();
}

module.exports = HomeController;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

LoginController.$inject = ['$scope', '$state', 'UserService']
function LoginController($scope, $state, UserService){
  $scope.submitName  = function(){
    if($scope.formData.name){

      localStorage.name = $scope.formData.name
      //Adding name to database and going to next page
      UserService.addName($scope.formData.name, localStorage.userId).then(function(response){
          if(response.status == "success"){
              $state.go('email')
          }
      })
    }
  } 
}

module.exports = LoginController;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

NavigationController.$inject = ["$scope", 'UserService', '$state']
function NavigationController($scope, UserService, $state) {
 $scope.logout  = function(){
    //This function sends a logout request to the server for a specific userId.
    UserService.logout(localStorage.userId).then(function(response){
      $state.go("home")
    })
  }
}

module.exports = NavigationController;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

console.log("using this file")
angular.module('DigitalGym', ['ionic', 'chart.js', 'ion-radial-progress'])


.run(function($ionicPlatform) {
  console.log("using this file2")
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, ChartJsProvider, $sceDelegateProvider, $ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
$sceDelegateProvider.resourceUrlWhitelist(['self','http://ricedigitalgym.blogs.rice.edu/']);

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: "LoginController"
  })
  .state('email', {
    url: '/email',
    templateUrl: 'templates/email.html',
    controller: "EmailController"
  })
  $stateProvider.state('tab', {
    url: '/tab',
    templateUrl: 'templates/tabs.html',
    controller: "NavigationController",
    abstract: true
  })
  .state('tab.data',{
      url: "/data",
      views: {
      'tab-data': {
      templateUrl: "templates/tab-data.html",
      controller: 'DataController'
    }
  }}
  ).state('tab.dash',{
      url: "/dash",
      views: {
      'tab-dash': {
      templateUrl: "templates/tab-dash.html",
      controller: 'ProfileController'
    }
  }}
  ).state('tab.about',{
      url: "/about",
      views: {
      'tab-about': {
      templateUrl: "templates/tab-about.html",
      controller: 'AboutController'
    }
  }}
  ) .state('home', {
    url: "/home",
    cache: false,
    templateUrl: 'templates/home.html',
    controller: 'HomeController'
  });

  $urlRouterProvider.otherwise('/home')

  // if none of the above states are matched, use this as the fallback
 

});


__webpack_require__(3)
__webpack_require__(2);




/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

DataService.$inject = ['$http', 'APP_CONFIG']
function DataService($http, APP_CONFIG){
	this.getLastData = function(){
		return $http.get(APP_CONFIG.API_ENDPOINT + "/data/last").then(function(list) {
			console.log(list)
			return list.data
		})
	}
}
module.exports = DataService

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

SessionService.$inject = ['$http', 'APP_CONFIG']
function SessionService($http, APP_CONFIG){
	this.getWorkoutDuration = function(){
		return $http.get(APP_CONFIG.API_ENDPOINT + "/workout_duration").then(function(duration){
			return duration.data
 		 })
	}
	this.getAverageDuration = function(){
		return $http.get(APP_CONFIG.API_ENDPOINT + "/average_duration").then(function(duration){
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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

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
	this.history = function(id){
		return $http.post(APP_CONFIG.API_ENDPOINT+ "/history", {userId: id}).then(function(response){
			return response.data
		})
	}	
}
module.exports = UserService

/***/ })
/******/ ]);