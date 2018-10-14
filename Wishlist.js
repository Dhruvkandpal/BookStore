var app = angular
    .module("myModule", ["ngStorage"])
    .controller("myController", function ($scope, $http, $window, $localStorage) {
        var data2 = {
            userID: $localStorage.user['User_id']
        };
        $http.post('http://localhost:3000/api/wishlist2', data2)
            .success(function (data, status, headers) {
                $scope.PostDataResponse = data;
                $scope.names = $scope.PostDataResponse;
                console.log(data);
            })
            .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
        });
    });
