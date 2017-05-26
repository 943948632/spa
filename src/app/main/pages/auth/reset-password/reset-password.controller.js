(function ()
{
    'use strict';

    angular
        .module('app.pages.auth.reset-password')
        .controller('ResetPasswordController', ResetPasswordController);

    /** @ngInject */
    function ResetPasswordController($http,$state,$scope)
    {
        // Data
         const vm = this;

        // Methods
       
       
        // if(yzsend==unll){
              
        // }else{
        //     vm.yzsend="yzsend()";
        // }

       
         $scope.yzsend = function() {

            $http({
                method: "post",

                data: {"phone": vm.form.phone},

                url: "https://staging.tophold.com/api/v2/users/send_password_code",

                headers: { "Content-Type": "application/json" }
            }).success(function(d) {
                console.log("获取手机验证码")

            }).error(function(error) {
                

            });

        }

         
        $scope.RPassword = function() {

            $http({
                method: "post",

                data: { "phone": vm.form.phone, "password": vm.form.password,"passwordConfirm":vm.form.passwordConfirm,"yanzheng":vm.form.yanzheng},

                url: "",

                headers: { "Content-Type": "application/json" }
            }).success(function(d) {
               

            }).error(function(error) {
                

            });

        }
        //////////
    }
})();