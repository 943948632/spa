(function() {
    'use strict';

    angular
        .module('app.pages.auth.forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /** @ngInject */
    function ForgotPasswordController($scope, $http, $interval, $state) {

        // Methods
        var vm = this;
        $scope.description = "获取验证码";
        $scope.descriptions = "下一步";
        var second = 59;
        var timerHandler;
        //手机验证
        var reg = /^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/;
        var mm = vm.email;
        if (reg.test(mm)) {
            $scope.getTestCode = function(email) {

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

                $http({
                    method: "post",
                    data: email,
                    url: "https://staging.tophold.com/api/v2/users/send_password_code",
                    headers: { "Content-Type": "application/json" }
                }).success(function(d) {
                    alert(" 我成功了")
                    $scope.canClick = false;
                    vm.phone = "";
                    vm.email = "";

                }).error(function(error) { console.log(error + "错误"); });

            };
        } else {



            $scope.getTestCode = function(phone) {

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

                $http({
                    method: "post",
                    data: phone,
                    url: "https://staging.tophold.com/api/v2/users/send_password_code",
                    headers: { "Content-Type": "application/json" }
                }).success(function(d) {
                    alert(" 我成功了")
                    $scope.canClick = false;
                    vm.phone = "";
                    vm.email = "";
                }).error(function(error) { console.log(error + "错误"); });

            };


        };


        //邮箱验证
        // $scope.getTestCode = function(email) {
        //     vm.phone = "";
        //     $scope.canClick = false;
        //     timerHandler = $interval(function() {
        //         if (second <= 0) {
        //             $interval.cancel(timerHandler);
        //             second = 59;
        //             $scope.description = "获取验证码";
        //             $scope.canClick = false;
        //         } else {
        //             $scope.description = second + "s后重发";
        //             second--;
        //             $scope.canClick = true;
        //         }
        //     }, 1000)

        //     $http({
        //         method: "post",
        //         data: email,
        //         url: "https://staging.tophold.com/api/v2/users/send_password_code",
        //         headers: { "Content-Type": "application/json" }
        //     }).success(function(d) {
        //         alert(" 我成功了")
        //         $scope.canClick = false;

        //     }).error(function(error) { console.log(error + "错误"); });

        // };







        $scope.next = function() {
            $state.go("app.pages_auth_forgot-passwords");
        }

    }
})();