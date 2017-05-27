(function() {
    'use strict';

    angular
        .module('app.dashboards.analytics')
        .controller('DashboardAnalyticsController', DashboardAnalyticsController)


    /** @ngInject */
    function DashboardAnalyticsController(DashboardData, uiGmapGoogleMapApi, $http, $scope) {
        var vm = this;
        vm.dashboardData = DashboardData;
        vm.widget4 = vm.dashboardData.widget4;
        var toke = sessionStorage.getItem("Token");
        // var symbol =
        //     alert(tock);
        $http({
            method: "get",
            url: "app/data/dashboard/analytics/a.json",
            headers: { "Content-Type": "application/json" }
        }).success(function(d) {
            var data = d.orders;
            vm.aa = data;
            $scope.toggle = function(a, b) {
                var symbol = b;
                 var Token=sessionStorage.getItem("Token");

                $http({
                    symbol: symbol,
                    method: "delete",
                    url: "https://staging.tophold.com/api/v2/holds/sell" + symbol,
                    headers: { "Content-Type": "application/json","X-Access-Token":Token }
                }).success(function(d) {
                    vm.bb = "已平仓";
                    vm.ft = false;
                    alert("平唱");
                    console.log(d);

                }).error(function(error) {


                });
            };
            vm.bb = "平仓";
        }).error(function(error) {});
        vm.nmfalse = "平仓";





        uiGmapGoogleMapApi.then(function() {});
    }
})();