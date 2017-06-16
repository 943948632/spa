(function() {
    'use strict';

    angular
        .module('app.pages.auth.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($scope, $http, $interval) {
        // Data
        const vm = this;
        //获取验证码
        $scope.canClick = false;
        $scope.description = "获取验证码";
        var second = 59;
        var timerHandler;
        $scope.getTestCode = function() {
            $http({
                method: "post",
                data: { "phone": vm.form.phone },
                url: "https://staging.tophold.com/api/v2/users/send_code",
                headers: { "Content-Type": "application/json" }
            }).success(function(d) {
                console.log("获取手机验证码")
            }).error(function(error) {});
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
        };

        //注册

        $scope.segister = function() {
            $http({
                method: "post",
                data: { name: vm.form.username, phone: vm.form.phone, useemali: vm.form.email, invitation_code: vm.invitation_code, phone_code: vm.form.phone_code, password: vm.password, password_confirmation: vm.password_confirmation },
                url: "https://staging.tophold.com/api/v2/users",
                headers: { "Content-Type": "application/json" }
            }).success(function(d) {
                vm.registersuccet = "注册成功";
                $state.go("app.pages.auth.login");

            }).error(function(error) {});
        }
    }
})();