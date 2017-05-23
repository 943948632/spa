(function() {
    'use strict';

    angular
        .module('app.dashboards.analytics')
        .controller('DashboardAnalyticsController', DashboardAnalyticsController);

    /** @ngInject */
    function DashboardAnalyticsController(DashboardData,uiGmapGoogleMapApi,$http,$scope) {
        var vm = this;
        vm.dashboardData = DashboardData;
        //  var id=sessionStorage.getItem("id")
        //  console.log(id+"asdsfcsdc")
       
    //    function my(){
    //     $http({


    //             method: "post",

    //             // data:{"name":vm.from.name,"status_name":vm.from.status,"ord_type_name":vm.from.ord_type_name,"side_name":side_name,"qty":vm.from.qty,"filled":vm.from.filled,"price":vm.from.price,"avg_px":vm.from.avg_px,"stop_px":vm.from.stop_px,"last_updated":vm.from.last_updated,"can_cancel":vm.from.can_cancel,},

    //             url: "https://staging.tophold.com/api/v2/get_orders",

    //             headers: { "Content-Type": "application/json" }
    //         }).success(function(d) {
    //                  console.log(d)
    //         }).error(function(error) {
               

    //         });
    //          }
    //          my()
            
              
        // Widget 4
        vm.widget4 = vm.dashboardData.widget4;


        // Methods

        //////////

        // Widget 2
        uiGmapGoogleMapApi.then(function() {
            // vm.widget2.map = vm.dashboardData.widget2.map;
        });
    }

})();