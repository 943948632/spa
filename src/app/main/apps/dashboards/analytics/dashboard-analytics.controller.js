(function() {
    'use strict';

    angular
        .module('app.dashboards.analytics')
        .controller('DashboardAnalyticsController', DashboardAnalyticsController);

    /** @ngInject */
    function DashboardAnalyticsController(DashboardData, uiGmapGoogleMapApi, $http, $scope) {
        var vm = this;
        vm.dashboardData = DashboardData;
        vm.widget4 = vm.dashboardData.widget4;
        $http({
            method: "get",
            url: "app/data/dashboard/analytics/a.json",
            headers: { "Content-Type": "application/json" }
        }).success(function(d) {

            vm.aa = d.orders;

        }).error(function(error) {});
        uiGmapGoogleMapApi.then(function() {});
    }
})();