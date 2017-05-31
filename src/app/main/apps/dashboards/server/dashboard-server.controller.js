(function() {
    'use strict';

    angular
        .module('app.dashboards.server')
        .controller('DashboardServerController', DashboardServerController);

    /** @ngInject */
    function DashboardServerController($scope, $interval, DashboardData, $http) {
        var vm = this;




        // Data
        // vm.dashboardData = DashboardData;
        var token = sessionStorage.getItem("Token")

        $http({
            data: { page: 1, per_page: 20, offset: 0, },
            method: "get",
            url: "https://staging.tophold.com/api/v2/orders",
            headers: { "Content-Type": "application/json", "X-Access-Token": token }
        }).success(function(d) {

            vm.aa = d.orders;


        }).error(function(error) {});

    }
})();