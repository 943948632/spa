(function() {
    'use strict';

    angular
        .module('app.dashboards.server')
        .controller('DashboardServerController', DashboardServerController);

    /** @ngInject */
    function DashboardServerController($scope, $interval, DashboardData, $http) {
        var vm = this;


        //交易过的产品



        var id = sessionStorage.getItem("id");

        $http({
            method: "get",

            data: { "id": id },

            url: "https://staging.tophold.com/api/v2/users/3/trade_products",

            headers: { "Content-Type": "application/json" }
        }).success(function(d) {
            vm.products = d.products;

        }).error(function(error) {


        });



    }
})();