var app = angular
    .module("myModule", [])
    .controller("myController", function ($scope,$window) {
        $scope.openWindow = function (item) {
            if (item == "Signup") {
                $window.open("Sign_up.html","_self");
            }
            if (item == "login") {
                $window.open("Login.html","_self");
            }
        };
        $scope.openWindow();
    });

