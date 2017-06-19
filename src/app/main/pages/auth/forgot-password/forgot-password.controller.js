(function() {
    'use strict';

    angular
        .module('app.pages.auth.forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /** @ngInject */
    function ForgotPasswordController($scope, $http, $interval, $state) {

        // Methods
        var vm = this;



        $scope.canClicknext = true;
        $scope.canClickPhoneNexts = true;
        $scope.description = "获取验证码";
        $scope.descriptions = "下一步";
        var second = 59;
        var timerHandler;

        $scope.getTestCodeEmail = function(email) {
            sessionStorage.setItem("ForGotEamil", email);
            alert(email);
            var reg = /^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/;
            if (reg.test(email)) {
                $scope.canClick = false;
                timerHandler = $interval(function() {
                    if (second <= 0) {
                        $interval.cancel(timerHandler);
                        second = 59;
                        $scope.description = "获取验证码";
                        $scope.canClick = false;
                    } else {
                        $scope.description = second + "s后重发";
                        second--;
                        $scope.canClick = true;
                    }
                }, 1000)
                var data = {
                    email: email
                }

                $http({
                    method: "post",
                    data: email,
                    url: "https://staging.tophold.com/api/v2/users/send_password_code",
                    headers: { "Content-Type": "application/json" }
                }).success(function(d) {

                    $scope.canClick = false;


                }).error(function(error) { console.log(error + "错误"); });
            } else {

            }
            $scope.next = function(emailcode) {
                if (emailcode.length == 6) {
                    sessionStorage.setItem("code", emailcode)
                    $state.go("app.pages_auth_forgot-passwords");
                } else {
                    vm.rightcode = "重新输入验证码";
                }

            };
        }


        //向手机发送手机验证码
        // $scope.canClickPhoneNexts = true;
        //$scope.descriptionsNext = "下一步";

        var secondPhone = 59;
        $scope.getTestCodePhone = function(phone) {
            sessionStorage.setItem("ForGotPhone", phone);
            var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if (reg.test(phone)) {


                $scope.canClickPhone = false;
                timerHandler = $interval(function() {
                    if (second <= 0) {
                        $interval.cancel(timerHandler);
                        secondPhone = 59;
                        $scope.descriptionPhone = "获取验证码";
                        $scope.canClickPhone = false;
                    } else {
                        $scope.descriptionPhone = secondPhone + "s后重发";
                        secondPhone--;
                        $scope.canClickPhone = true;
                    }
                }, 1000)
                var data = {
                    phone: phone
                }

                $http({
                    method: "post",
                    data: data,
                    url: "https://staging.tophold.com/api/v2/users/send_password_code",
                    headers: { "Content-Type": "application/json" }
                }).success(function(d) {


                    $scope.canClickPhoneNexts = false;

                }).error(function(error) { console.log(error + "错误"); });
            } else {}

            $scope.next = function(phonecode) {
                if (phonecode.length == 6) {
                    sessionStorage.setItem("code", phonecode)
                    $state.go("app.pages_auth_forgot-passwords");
                } else {
                    vm.rightcode = "重新输入验证码";
                }
            }
        };

    }
})();