(function() {
    'use strict';

    angular
        .module('app.pages.auth.forgot-password')
        .controller('ForgotPasswordController', ForgotPasswordController);

    /** @ngInject */
    function ForgotPasswordController($scope, $state, msApi, $http) {
        // Data
        // Methods
        const vm = this;
        // vm.cc = "222";
        console.log(vm)
        console.log($scope)

        $scope.forgots = function() {
            // var forgot = {
            //     forgotEmail: vm.form.email
            // };
            console.log("2" + $scope)

            $http({
                method: "post",

                data: { "email": vm.form.email },

                url: "https://staging.tophold.com/api/v2/users/send_password_code",

                headers: { "Content-Type": "application/json" }
            }).success(function(d) {
                vm.lookemail = "请查看邮件";




                $state.go('app.pages.auth.login');

                console.log(d + "登录成功");
            }).error(function(error) { console.log(error + "错误"); });


            


        };

       
    }
})();