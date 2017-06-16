(function() {
    'use strict';

    angular
        .module('app.pages.auth.forgot-passwords')
        .controller('ForgotPasswordControllers', ForgotPasswordControllers);

    /** @ngInject */
    function ForgotPasswordControllers($scope, $http, $interval) {

        // Methods
        var vm = this;
        $scope.getTestCode = function() {
            $http({
                method: "post",
                data: { "email": vm.form.email },
                url: "https://staging.tophold.com/api/v2/users/send_password_code",
                headers: { "Content-Type": "application/json" }
            }).success(function(d) {
                vm.lookemail = "请查看邮件";
                // $state.go('app.pages.auth.login')
                console.log(d + "登录成功");
            }).error(function(error) { console.log(error + "错误"); });

        }
    }

})();