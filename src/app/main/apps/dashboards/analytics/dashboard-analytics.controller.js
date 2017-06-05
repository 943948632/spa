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
        setTimeout(function() {


            $http({
                method: "get",
                url: "https://staging.tophold.com/api/v2/accounts/detail",
                headers: { "X-Access-Token": toke }
            }).success(function(d) {

                vm.aa = d.holds;
                var aa = d.holds;

                $scope.toggle = function(a, b, c) {
                    var c = c;
                    var Token = sessionStorage.getItem("Token");
                    $http({
                        data: { symbol: b },
                        method: "delete",
                        url: "https://staging.tophold.com/api/v2/holds/sell",
                        headers: { "Content-Type": "application/json", "X-Access-Token": Token }
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
        }, 2000);




        uiGmapGoogleMapApi.then(function() {});
    }
})();