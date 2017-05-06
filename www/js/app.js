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


require('../services')
require('../controllers');


