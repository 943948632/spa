(function() {
    'use strict';

    angular
        .module('app.dashboards.server')
        .controller('DashboardServerController', BigChart);

    /** @ngInject */
    function BigChart($scope, $http) {
        var vm = this;
        vm.charts = {
            options: {
                chart: {
                    type: 'line',
                    zoomType: 'x'
                },
                tooltip: {
                    xDateFormat: '%Y-%m-%d %H:%M:%S',
                    valueDecimals: 2
                },
                xAxis: {
                    type: 'datetime',
                    dateTimeLabelFormats: {
                        hour: '%H:%M'
                    },
                    minRange: 1000, // 不能放大超过1s
                    minTickInterval: 1000 // 放大间隔最小为1s
                }
            },
            series: {　　　　　　　　 data: [100.0, 99.0, 100.0, 98.039216, 100.0, 99.0, 100.0, 100.0, 100.0, 100.0, 97.087379, 99.0, 99.009901, 100.0, 99.0, 100.0, 99.009901, 100.0, 100.0, 98.039216, 100.0, 100.0, 100.0, 99.009901, 99.009901, 100.0, 99.009901, 100.0, 99.0, 100.0, 100.0, 99.0, 100.0, 99.009901, 100.0, 99.0, 99.0, 99.009901, 99.009901, 100.0, 100.0, 99.009901, 100.0, 99.009901, 100.0, 99.0, 98.039216, 100.0, 99.0, 100.0, 99.0, 100.0, 100.0, 100.0, 100.0, 100.0, 99.0, 100.0, 100.0], 　　　　　　　　name: '192.168.17.136'　　　　　　 },
            　　　　　title: {
                text: null
            }
        }
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