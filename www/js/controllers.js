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
    localStorage.email = $scope.formData.email
    localStorage.sessionBegin = (new Date).getTime()
    $state.go('tab.data')
  }
})
.controller('DataCtrl', function($scope, $http, $timeout) {
  $scope.exit  = function(){
    console.log("testing")
    $http.post("http:/35.162.184.130:8000/bbb/addsession", {stampStart: 
    localStorage.sessionBegin, 
    stampEnd: (new Date).getTime(),
    name: localStorage.name, 
    gender: localStorage.gender, 
    email: localStorage.email},
    function(response){
      console.log("ok")
      $state.go("login")
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
      $http.get("http://ec2-35-162-184-130.us-west-2.compute.amazonaws.com:8000/bbb/data/last").then(function(list) {
            

            //var val = $scope.averageRPM(list.data.slice(list.data.length-50, list.data.length-1))
            var rpm = list.data.rpm
            $scope.data[0].push(rpm)
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
      $state.go('email')
    }

  }
  
})





