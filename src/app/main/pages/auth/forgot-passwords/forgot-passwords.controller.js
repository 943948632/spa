(function() {
    'use strict';

    angular
        .module('app.pages.auth.forgot-passwords')
        .controller('ForgotPasswordControllers', ForgotPasswordControllers);

    /** @ngInject */
    function ForgotPasswordControllers($scope, $http, $interval, $state) {

        // Methods
        var vm = this;
        $scope.Send = function() {
            var ForGotEamil = sessionStorage.getItem("ForGotEamil");
            var ForGotPhone = sessionStorage.getItem("ForGotPhone");
            var code = sessionStorage.getItem("code");
            if (vm.password == vm.password_confirmation) {

            }
            var data = {
                email: ForGotEamil,
                phone: ForGotPhone,
                code: code,
                password: vm.password,
                password_confirmation: vm.password_confirmation
            }

            $http({
                method: "put",
                data: data,
                url: "https://staging.tophold.com/api/v2/users/update_password_with_code",
                headers: { "Content-Type": "application/json" }
            }).success(function(d) {
                vm.SendSuccessfully = "成功"
                setTimeout(function() {
                    $state.go('app.pages_auth_login');
                }, 2000)


            }).error(function(error) {});


        }
    }

})();