(function() {
    'use strict';

    angular
        .module('app.pages.auth.register')
        .controller('RegisterController', RegisterController);

    /** @ngInject */
    function RegisterController($scope, $state, msApi, $http) {
        // Data
        const vm = this;
        vm.codetext = "免费获取验证";

        $scope.zcyzsend = function() {

            $http({
                method: "post",

                data: { "phone": vm.form.phone },

                url: "https://staging.tophold.com/api/v2/users/send_code",

                headers: { "Content-Type": "application/json" }
            }).success(function(d) {
                console.log("获取手机验证码")


            }).error(function(error) {


            });

        };
        $scope.segister = function() {

                $http({
                    method: "post",

                    data: { name: vm.form.username, phone: vm.form.phone, useemali: vm.form.email, phone_code: vm.form.phone_code, password: vm.form.password, password_confirmation: vm.form.password_confirmation },

                    url: "https://staging.tophold.com/api/v2/users",

                    headers: { "Content-Type": "application/json" }
                }).success(function(d) {
                    if (d == d.level_name) {
                        vm.cc = "注册成功";
                        console.log("dscfdsvdfv");
                    }



                    console.log(d + "登录成功");
                }).error(function(error) { console.log(error + "错误"); });



            }
            // Methods

        //////////
    }
})();