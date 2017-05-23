(function() {
    'use strict';

    angular
        .module('app.pages.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope, $state, msApi, $http) {
        // Data
        // Methods
        const vm = this;

        console.log(vm)
        console.log($scope)

        $scope.logins = function() {

            $http({
                method: "post",

                data: { "login": vm.form.name, "password": vm.form.password },

                url: "https://staging.tophold.com/api/v2/users/login",

                headers: { "Content-Type": "application/json" }
            }).success(function(d) {
                vm.cc = "登录成功";

                //用户姓名
                sessionStorage.setItem("name", d.user.name);
                //用户头像
                var touxiang=d.user.avatar_url;
                var img=touxiang.replace(/[?]+x-oss-process=style[^]+[200-200]/, "");
                 sessionStorage.setItem("touxiang",img);
                
                // sessionStorage.setItem("imgs", touxiang);
                //用户Token
                sessionStorage.setItem("Token",d.user.authentication_token);
                //获取id
                sessionStorage.setItem("id",d.user.id)
                // 登陆成功自动跳转
                $state.go('app.dashboards_project');

            }).error(function(error) {
                vm.cc = "账号密码错误";
                console.log(error + "错误");

            });

        }
    }
})();