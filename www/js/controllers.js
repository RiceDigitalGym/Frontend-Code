
// var API_ENDPOINT = "http://52.34.141.31:8000/bbb"
var API_ENDPOINT = "http://localhost:8000/bbb"
angular.module('starter.controllers', [])

.controller('ProfileController', function($scope, $http) {
  $scope.$on('$ionicView.loaded', function () {


  })
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


  
  $scope.gt50 = function() {
        return $scope.deg > 180
  }
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
$scope.current_duration = 0
$scope.current_duration_formatted = "00:00:00"
$scope.$on('$ionicView.loaded', function () {
  $http.get(API_ENDPOINT + "/workout_duration").then(function(duration){

    $scope.current_duration = parseInt(duration.data.duration)
    $scope.current_duration_formatted = String($scope.current_duration).toHHMMSS();
    
    (function count(){
      $scope.current_duration = $scope.current_duration+1
      $scope.current_duration_formatted = String($scope.current_duration).toHHMMSS();
      console.log($scope.current_duration_formatted)

      $timeout(count, 1000)
    })()
  })
  console.log(API_ENDPOINT + "/average_duration")
  $http.get(API_ENDPOINT + "/average_duration").then(function(response){
    console.log("hello")
    $scope.avg = response.data.duration
  })

      localStorage.sessionBegin = (new Date).getTime();
     (function tick() {
      var old_timestamp = $scope.sessionPickup||localStorage.sessionBegin;
      $scope.sessionPickup = (new Date).getTime();
      $http.get(API_ENDPOINT + "/data/last").then(function(list) {
            //var val = $scope.averageRPM(list.data.slice(list.data.length-50, list.data.length-1))
            var rpm = list.data.rpm
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





