HomeController.$inject = ["$scope", "$timeout", "$state", "SessionService", "$http"]

function HomeController($scope, $timeout, $state, SessionService, $http){
  //Check to see if an RFID has been scanned every 500ms
  //$http is needed because this function is pre-evaluated
      (function tick() {
      SessionService.listen().then(function(list){
        if(list.status == "success" && list.user!=null){

            if (list.user.name == null || list.user.name == "null"){
              //If the user has not set name, direct them to do so before giving access to app.
              localStorage.userId = list.user.id
              $state.go("login")
            }
            else{
              //If the user has set their name, set user data and continue to app
              localStorage.name = list.user.name
              localStorage.email = list.user.email
              localStorage.gender = list.user.gender
              //another data point
              localStorage.userId = list.user.id
              //redirect
              $state.go("tab.data")
            }
          }
          else{
              $timeout(tick, 500)
          }
        
      })
    })();
}

module.exports = HomeController;