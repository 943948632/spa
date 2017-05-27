(function() {
    'use strict';

    angular
        .module('app.dashboards.server')
        .controller('DashboardServerController', DashboardServerController);

    /** @ngInject */
    function DashboardServerController($scope, $interval, DashboardData, $http) {
        var vm = this;




        // Data
        vm.dashboardData = DashboardData;


        $http({
            method: "get",
            url: "app/data/dashboard/analytics/a.json",
            headers: { "Content-Type": "application/json" }
        }).success(function(d) {

            vm.aa = d.orders;

        }).error(function(error) {});

    }
})();