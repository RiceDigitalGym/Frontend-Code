DataController.$inject = ['$scope', '$timeout', '$state', '$interval', 'DataService', 'UserService', 'SessionService'];

function DataController($scope, $timeout, $state, $interval, DataService, UserService, SessionService) {

    String.prototype.toHHMMSS = function () {
        //console.log(this)
        // this should be in milliseconds, second parameter is the base (i.e., decimal)
        var sec_num = parseInt(this, 10) / 1000
        var hours   = Math.floor(sec_num / 3600)
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60)
        var seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60))

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    }

    //used for radial display
    $scope.gt50 = function() {
        return $scope.deg > 180;
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

    $scope.$on('$ionicView.loaded', function() {
        //Requests the last data point in the database
        //Todo: Make this bike specific
        (function tick() {
        if (localStorage.userID){
            DataService.getLastData(localStorage.userID).then(function(last) {
                //Set rpm, display rpm in radial view, and add datapoint to chart.

                var rpm = last.rpm
                console.log("rpm",rpm);
                $scope.data[0].push(rpm)
                $scope.rpm_data = [0, rpm-200, rpm]
                $scope.lastRPM = parseInt(rpm)
                $scope.deg = rpm*360.0/200.0
                $scope.labels.push("")
                if ($scope.data[0].length>50) {
                    $scope.data[0].shift()
                    $scope.labels.shift()
                }
                //$timeout(tick, 500);
            })
            $timeout(tick, 500)
        }})();

    });

    //Used for keeping track of current workout duration. Display purposes only. Real time is stored in server.
    $scope.current_duration = 0
    $scope.current_duration_formatted = "00:00:00"

    function duration_diplay() {
        if (localStorage.userID){
      SessionService.getWorkoutDuration(localStorage.userID).then(function(duration){
        if (duration.success) {
          //Set the current workout duration to duration on server.
          $scope.current_duration = parseInt(duration.duration)
          $scope.current_duration_formatted = String($scope.current_duration).toHHMMSS();
          //This self-calling function is used to locally keep track of time.
          // var count = function() {
          //     $scope.current_duration = $scope.current_duration + 1000;
          //     console.log("real time duration",$scope.current_duration);
          //     $scope.current_duration_formatted = String($scope.current_duration).toHHMMSS();
          //     console.log("format",$scope.current_duration_formatted);
          // }
          // timeout = $timeout(count, 1000);
        }
        else {
          $scope.current_duration_formatted = "00:00:00";
        }
      })
    }};

    var promise;
    $scope.start_display = function() {
      promise = $interval(duration_diplay, 1000, -1);
    };
    //$scope.stop_display = function() {
    //   $interval.cancel(promise)
    // };
    $scope.start_display();

    // function stop_duration_display() {
    //   SessionService.checkActiveSession(localStorage.userID).then(function(active){
    //     if (active.active == false) {
    //       $interval.cancel(timer01);
    //     }
    //   });
    // };




    //This fetches the average current duration. All computation for average duration done on the server side.
    SessionService.getAverageDuration(localStorage.userID).then(function(duration) {
        if (duration.success) {
            $scope.avg = duration.duration;
        }
        else {
            $scope.avg = "00:00:00";
        }
    })

    // $scope.$on('$ionicView.loaded', function() {
    //     //Requests the last data point in the database
    //     //Todo: Make this bike specific
    //     function tick() {
    //         DataService.getLastData(localStorage.userID).then(function(last) {
    //             //Set rpm, display rpm in radial view, and add datapoint to chart.
    //             var rpm = last.rpm
    //             console.log("rpm",rpm);
    //             $scope.data[0].push(rpm)
    //             $scope.rpm_data = [0, rpm-200, rpm]
    //             $scope.lastRPM = parseInt(rpm)
    //             $scope.deg = rpm*360.0/200.0
    //             $scope.labels.push("")
    //             if ($scope.data[0].length>50) {
    //                 $scope.data[0].shift()
    //                 $scope.labels.shift()
    //             }
    //
    //             $timeout(tick, 500);
    //         })
    //         //$timeout(tick, 500)
    //     };
    //
    // });

}

module.exports = DataController;
