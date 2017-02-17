// DataService.$inject= ['$http', '$scope'];
// function DataService($http, $scope) {
//     var service = this;
//     function getPath(){
//         "/1448766535863/1448766542234/"
//     }
//     function getUrl() {
//         return APP_CONFIG.endpointUri + getPath;
//     }

//     service.all = function() {
//         return $http.get(getUrl()).then(function(list) {
//             return list.data;
//         });
//     };
// }
// module.exports = DataService;