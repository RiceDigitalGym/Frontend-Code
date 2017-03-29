
var API_ENDPOINT = "http://52.34.141.31:8000/bbb"
// var API_ENDPOINT = "http://localhost:8000/bbb"
angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {

})
.controller('EmailCtrl', function($scope, $http, $state){
  $scope.formData = {}
      $scope.male = "button1"
      $scope.female = "button2"

  $scope.maleFunction = function(){
      $scope.male = "button2"
      $scope.female = "button1"
  }
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
    localStorage.email = $scope.formData.email
       $http.post(API_ENDPOINT+ "/addemailgender", {name: $scope.formData.email, userId: localStorage.userId, gender: gender}).then(function(response){
         if(response.data.status == "success"){
             $state.go('tab.data')
        }
       })

  }
})
.controller('HomeController', function($scope, $http, $timeout, $state){
    $scope.$on('$ionicView.loaded', function (viewInfo, state) {
        console.log('CTRL - $ionicView.loaded', viewInfo, state);
    });
       (function tick() {
      var old_timestamp = $scope.sessionPickup||localStorage.sessionBegin;
      $scope.sessionPickup = (new Date).getTime();
      $http.get(API_ENDPOINT + "/sessionlisten").then(function(list) {

        if(list.data.status == "success"){
          console.log(list.data.user)
            if (list.data.user.name == null || list.data.user.name == "null"){
              localStorage.userId = list.data.user.id
              $state.go("login")
            }
            else{
              console.log("user has a name")
              localStorage.name = list.data.user.name
              localStorage.email = list.data.user.email
              localStorage.gender = list.data.user.gender
              localStorage.userId = list.data.user.id
              $state.go("tab.data")
            }
          }
          else{
              $timeout(tick, 500)
          }
        });
    })();
    $http.get(API_ENDPOINT + "/sessionlisten",
    function(response){
      console.log(response)
    })
})
.controller('DataCtrl', function($scope, $http, $timeout, $state) {

  $scope.name = localStorage.name
  $scope.exit  = function(){
    $http.post(API_ENDPOINT + "/logout", {userId: localStorage.userId}).then(function(response){
      console.log("logging_out")
      $state.go("home")
    })
  }

  $scope.labels = ["0 min", "1 sec"];
  $scope.series = ['rpm'];
  $scope.data = [
    [0]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
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
$scope.$on('$ionicView.loaded', function () {
      localStorage.sessionBegin = (new Date).getTime();
     (function tick() {
      var old_timestamp = $scope.sessionPickup||localStorage.sessionBegin;
      $scope.sessionPickup = (new Date).getTime();
      $http.get(API_ENDPOINT + "/data/last").then(function(list) {
            

            //var val = $scope.averageRPM(list.data.slice(list.data.length-50, list.data.length-1))
            var rpm = list.data.rpm
            $scope.data[0].push(rpm)
            $scope.rpm_data = [0, rpm-200, rpm]
            $scope.lastRPM = rpm
            //$scope.lastRPM = val
            $scope.labels.push("")

            if($scope.data[0].length>50){
              $scope.data[0].shift()
              $scope.labels.shift()
            }
            $timeout(tick, 500)
        });
    })();
  });


})
.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('LoginCtrl', function($scope, $state, $http){
  $scope.submitName  = function(){
    if($scope.formData.name){
      localStorage.name = $scope.formData.name
       $http.post(API_ENDPOINT+ "/addname", {name: $scope.formData.name, userId: localStorage.userId}).then(function(response){
         if(response.data.status == "success"){
         $state.go('email')
        }
       })
     
    }

  }
  
})





