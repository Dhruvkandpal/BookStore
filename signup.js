var app = angular
    .module("validation", ["ngMessages"])
    .controller("RegistrationController", function ($scope, $http, $window) {
        var model = this;

        model.message = "";

        model.user = {
            name: "",
            email: "",
            college: "",
            address: "",
            phone: "",
            password: "",
            confirmPassword: ""
        };

        model.submit = function (isValid) {
            if (isValid) {
                model.message = "Submitted " + model.user.name;                
                var data2 = {
						name: model.user.name,
                        college: model.user.college,
                        email: model.user.email,
                        address: model.user.address,
                        phone: model.user.phone,
                        password: model.user.password
                };
                console.log(data2);
                $http.post('http://localhost:3000/api/signup', data2)
                .success(function (data, status, headers) {
                    $scope.PostDataResponse = data;
					$scope.openWindow = function() {
								$window.open("Booklist.html", "_self");
							};
							$scope.openWindow();
                })
                .error(function (data, status, header, config) {
                    $scope.ResponseDetails = "Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config;
                });
            } else {
                model.message = "There are still invalid fields below";
            }
            $scope.master = { name: "", email: "", college: "", address: "", phone: "", password: "", confirmPassword: "" };
            $scope.reset = function () {
                $scope.user = angular.copy($scope.master);
            };
            $scope.reset();
        };

    });

    app.directive("compareTo", function () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function (scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function (modelValue) {
                    return modelValue == scope.otherModelValue;
                };

                scope.$watch("otherModelValue", function () {
                    ngModel.$validate();
                });
            }
        };
    });

   

