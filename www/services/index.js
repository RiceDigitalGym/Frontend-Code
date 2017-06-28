'use strict';

var GLOBALS = require('../config-globals');
var dataService = require('./DataService');
var sessionService = require('./SessionService');
var userService = require('./UserService');

angular
	.module(GLOBALS.APP_NAME)
    .service('DataService', dataService)
    .service('SessionService', sessionService)
    .service('UserService', userService);
    
    

