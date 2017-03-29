! function(e) {
    var t = document.getElementsByTagName("script"),
        n = t[t.length - 1].src;
    e.module("ion-radial-progress", []).directive("ionRadialProgress", ["$timeout", function(e) {
        return {
            restrict: "E",
            transclue: !0,
            replace: !0,
            scope: {
                timer: "="
            },
            controller: ["$scope", function(t) {
                t.seconds = t.timer
            }],
            templateUrl: n.substring(0, n.lastIndexOf("/") + 1) + "../templates/ion-radial-progress.html"
        }
    }])
}(window.angular);