var GLOBALS = {};


APP_CONFIG = {
	API_ENDPOINT : "http://127.0.0.1:8000/bbb"
	// API_ENDPOINT : "http://52.34.141.31:8000/bbb"
}


GLOBALS.APP_NAME = "DigitalGym"

module.exports = GLOBALS
angular.module(GLOBALS.APP_NAME).constant("APP_CONFIG", APP_CONFIG)