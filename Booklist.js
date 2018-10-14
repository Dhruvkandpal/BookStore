var app = angular
    .module("myModule", ["ngStorage"])
    .controller("myController", function ($scope, $http, $window, $localStorage) {
        $scope.openWindow = function (item) {
            if (item == "logout") {
                $window.open("Login.html", "_self");
            }
            if (item == "wishlist") {
                $window.open("Wishlist.html", "_self");
            }
        }
        $scope.addbook = function (item) {         
            var data2 = {
                bookID :item,
                userID: $localStorage.user['User_id']
            };
            $http.post('http://localhost:3000/api/wishlist', data2)
                .success(function (data, status, headers) {
                    $scope.PostDataResponse = data;
                    if (data.length > 0) {
                        alert("Book added");
                    } else {
                        alert("Invalid data");
                    }
                })
                .error(function (data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                });
        }
        $scope.openWindow();
        $http.get('http://localhost:3000/api/booklist')
            .success(function (data, status, headers) {
                $scope.PostDataResponse = data;
                $scope.names = $scope.PostDataResponse;
                console.log(data);
                $scope.search = function (item) {
                    if ($scope.searchText == undefined) {
                        return true;
                    }
                    else {
                        if (item.Bname.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1 ||
                            item.Author.toLowerCase().indexOf($scope.searchText.toLowerCase()) != -1) {
                            return true;
                        }
                    }
                    return false;
                }
                $scope.sortColumn = "price";
                $scope.reverseSort = false;

                $scope.sortData = function () {
                    $scope.reverseSort = ($scope.sortColumn == "price") ? !$scope.reverseSort : false;
                    $scope.sortColumn = "price";
                }

                $scope.getSortClass = function () {

                    if ($scope.sortColumn == "price") {
                        return $scope.reverseSort ? 'arrow-down' : 'arrow-up';
                    }

                    return '';
                }
            })
            .error(function (data, status, header, config) {
            $scope.ResponseDetails = "Data: " + data +
                "<hr />status: " + status +
                "<hr />headers: " + header +
                "<hr />config: " + config;
            });
    });
