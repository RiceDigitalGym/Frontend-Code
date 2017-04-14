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