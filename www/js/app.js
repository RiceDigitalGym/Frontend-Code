console.log("File 'app.js' is being used.")
angular.module('DigitalGym', ['ionic', 'chart.js', 'ion-radial-progress', 'angularSpinner'])
    
    .run(function($ionicPlatform) {
        console.log("File 'app.js' is being used. (2)")

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

    .run(function($ionicPlatform, $ionicPopup) {
        $ionicPlatform.ready(function() {
            if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.alert({
                        title: "No Internet Connection",
                        content: "This app will not function without a working internet connection. Please connect to the internet and try again."
                    })
                    .then(function(result) {
                            ionic.Platform.exitApp();
                    });
                }
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider, ChartJsProvider, $sceDelegateProvider, $ionicConfigProvider, $httpProvider) {
        
        $ionicConfigProvider.views.maxCache(0);
        $sceDelegateProvider.resourceUrlWhitelist(['self','http://ricedigitalgym.blogs.rice.edu/']);

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js

        $httpProvider.interceptors.push(function($q, $injector) {
            return {
                'request': function(config) {
                    // console.log("Config: " + JSON.stringify(config));
                    // console.log("Current token: " + localStorage.token);
                    config.headers['authorization'] = localStorage.token;
                    // console.log(config.headers['authorization']);
                    return config;
                }, 
                'response': function(response) {
                    // console.log("Interceptor response: " + JSON.stringify(response));
                    // console.log("Interceptor response status: " + response.status);
                    return response;
                },
                'responseError': function(response) {
                    console.log("Interceptor responseError: " + JSON.stringify(response));
                    console.log("Interceptor responseError status: " + response.status);
                    var $state = $injector.get('$state');
                    if (response.status == 401 || response.status == 403 || response.status == 400) {
                        $state.go('home');
                        return response;
                    }
                }
            };
        });

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'templates/login.html',
                controller: "LoginController"
            })
            .state('picture', {
                url: '/profilepicture',
                templateUrl: 'templates/profilepictures.html',
                controller: "PictureController"
            })
            .state('setup', {
                url: '/setup_account',
                templateUrl: 'templates/setup.html',
                controller: "SetupController"
            })
            .state('changepassword', {
                url: '/changepassword',
                templateUrl: 'templates/changepassword.html',
                controller: "ChangePasswordController"
            })
            .state('forgotpassword', {
                url: '/forgotpassword',
                templateUrl: 'templates/forgotpassword.html',
                controller: "ResetPasswordController"
            })
            .state('tag', {
                url: '/tag',
                templateUrl: 'templates/tag.html',
                controller: "TagController"
            })
            .state('main', {
                url: "/main",
                templateUrl: "templates/main.html",
                controller: 'MainController'
            })
            .state('tab', {
                url: '/tab',
                templateUrl: 'templates/tabs.html',
                controller: "NavigationController",
                abstract: true
            })
            .state('tab.data', {
                url: "/data",
                views: {
                    'tab-data': {
                        templateUrl: "templates/tab-data.html",
                        controller: 'DataController'
                    }
                }
            })
            .state('tab.about', {
                url: "/about",
                views: {
                    'tab-about': {
                        templateUrl: "templates/tab-about.html",
                        controller: 'AboutController'
                    }
                }
            }) 
            .state('home', {
                url: "/home",
                cache: false,
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');

    });

require('../services');
require('../controllers');


