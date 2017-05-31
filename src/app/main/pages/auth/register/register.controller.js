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
        // vm.pd=false;
        $scope.zcyzsend = function() {

              
            $http({
                method: "post",

                data: { "phone": vm.form.phone },

                url: "https://staging.tophold.com/api/v2/users/send_code",

                headers: { "Content-Type": "application/json" }
            }).success(function(d) {
                 var timer = setInterval(function() {
                vm.codetext = "免费获取验证";

		     	for(i = 0; i < 60; i++) {
				var time = 60;
				 vm.tg = time - i;
                 
                 vm.codetext="重新获取";
                 
                // vm.pd=true;

				if(tg == 1) {
					clearInterval(timer); //清除定时器
				}
				 
			}
		}, 1000); 

                console.log("获取手机验证码")


            }).error(function(error) {


            });

        };
        $scope.segister = function() {

                $http({
                    method: "post",

                    data: { name: vm.form.username, phone: vm.form.phone, useemali: vm.form.email,invitation_code:vm.invitation_code, phone_code: vm.form.phone_code, password: vm.form.password, password_confirmation: vm.form.password_confirmation },

                    url: "https://staging.tophold.com/api/v2/users",

                    headers: { "Content-Type": "application/json" }
                }).success(function(d) {
                    if (d == d.level_name) {
                        vm.cc = "注册成功";
                         $state.go("app.pages.auth.login");
                       
                    }



                    
                }).error(function(error) { console.log(error + "错误"); });



            }
            // Methods

        //////////
    }
})();