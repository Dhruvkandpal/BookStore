var app = angular
    .module("validation", ["ngMessages", "ngStorage"])
    .controller("RegistrationController", function($scope, $http, $window, $localStorage) {
        var model = this;

        model.message = "";

        model.user = {
            email: "",
            password: ""
        };

        model.submit = function(isValid) {
            if (isValid) {
                var data2 = {
                    email: model.user.email,
                    password: model.user.password
                };
                $http.post('http://localhost:3000/api/check-login', data2)
                    .success(function(data, status, headers) {
                        $scope.PostDataResponse = data;
                        console.log(data[0]);
						if (data.length > 0) {
							$localStorage.user = data[0];
							console.log($localStorage.user);
                            alert("You are in! " + data[0]['Name']);
							$scope.openWindow = function() {
								$window.open("Booklist.html", "_self");
							};
							$scope.openWindow();
                        } else {
                            alert("Invalid data");
                        }
                    })
					
                    .error(function(data, status, header, config) {
                        $scope.ResponseDetails = "Data: " + data +
                            "<hr />status: " + status +
                            "<hr />headers: " + header +
                            "<hr />config: " + config;
                    });
            } else {
                model.message = "There are still invalid fields below";
            }
			$scope.master = {
								email: "",
								password: ""
							};
							$scope.reset = function() {
								$scope.user = angular.copy($scope.master);
							};
							$scope.reset();
        };

    });

app.directive("compareTo", function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
});