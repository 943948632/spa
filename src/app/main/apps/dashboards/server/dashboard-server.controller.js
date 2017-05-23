(function() {
    'use strict';

    angular
        .module('app.dashboards.server')
        .controller('DashboardServerController', DashboardServerController);

    /** @ngInject */
    function DashboardServerController($scope, $http) {
        var vm = this;

        $http({
            method: "get",
            url: "app/data/dashboard/analytics/a.json",
            headers: { "Content-Type": "application/json" }
        }).success(function(d) {

            vm.aa = d.orders;

        }).error(function(error) {});

        // Data
        // vm.dashboardData = DashboardData;

        // Widget 1
        // vm.widget1 = {
        //     title: vm.dashboardData.widget1.title,
        //     chart: {
        //         options: {
        //             chart: {
        //                 type: 'lineChart',
        //                 // color: ['#4caf50', '#3f51b5', '#ff5722'],
        //                 color: ['#4caf50'],
        //                 height: 320,
        //                 margin: {
        //                     top: 32,
        //                     right: 32,
        //                     bottom: 32,
        //                     left: 48
        //                 },
        //                 useInteractiveGuideline: true,
        //                 clipVoronoi: false,
        //                 interpolate: 'cardinal',
        //                 x: function(d) {

        //                     return d.x;
        //                 },
        //                 y: function(d) {
        //                     return d.y;
        //                 },
        //                 xAxis: {
        //                     tickFormat: function(d) {
        //                         console.log(d)
        //                         return d + ' min.';
        //                     },
        //                     showMaxMin: false
        //                 },
        //                 yAxis: {
        //                     tickFormat: function(d) {
        //                         return d + ' MB';
        //                     }
        //                 },
        //                 interactiveLayer: {
        //                     tooltip: {
        //                         gravity: 's',
        //                         classes: 'gravity-s'
        //                     }
        //                 },
        //                 legend: {
        //                     margin: {
        //                         top: 8,
        //                         right: 0,
        //                         bottom: 32,
        //                         left: 0
        //                     },
        //                     rightAlign: false
        //                 }
        //             }
        //         },
        //         data: vm.dashboardData.widget1.chart
        //     }
        // };




    }
})();