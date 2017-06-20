(function() {
    'use strict';

    angular
        .module('app.account')
        .controller('AccountController', AccountController);

    /** @ngInject */
    function AccountController($scope, $interval, DashboardData, $http) {
        // Data
        var vm = this;
        vm.dashboardData = DashboardData;
        console.log(vm.dashboardData);

        // Widget 1
        vm.widget1 = {
            title: vm.dashboardData.widget1.title,
            chart: {
                options: {
                    chart: {
                        type: 'lineChart',
                        color: ['#4caf50', '#3f51b5', '#ff5722'],
                        height: 320,
                        margin: {
                            top: 32,
                            right: 32,
                            bottom: 32,
                            left: 48
                        },
                        useInteractiveGuideline: true,
                        clipVoronoi: false,
                        interpolate: 'cardinal',
                        x: function(d) {
                            return d.x;
                        },
                        y: function(d) {
                            return d.y;
                        },
                        xAxis: {
                            tickFormat: function(d) {
                                return d + ' min.';
                            },
                            showMaxMin: false
                        },
                        yAxis: {
                            tickFormat: function(d) {
                                return d + ' MB';
                            }
                        },
                        interactiveLayer: {
                            tooltip: {
                                gravity: 's',
                                classes: 'gravity-s'
                            }
                        },
                        legend: {
                            margin: {
                                top: 8,
                                right: 0,
                                bottom: 32,
                                left: 0
                            },
                            rightAlign: false
                        }
                    }
                },
                data: vm.dashboardData.widget1.chart
            }
        };




        var id = sessionStorage.getItem("id");
        $http({
            method: "get",
            data: { "id": id },
            url: "https://staging.tophold.com/api/v2/users/3/trade_products",
            headers: { "Content-Type": "application/json" }
        }).success(function(d) {
            vm.products = d.products;

        }).error(function(error) {});

        vm.dtOptions = {
            dom: '<"top"f>rt<"bottom"<"left"<"length"l>><"right"<i><"pagination"p>>>',
            pagingType: 'simple',
            autoWidth: false,
            responsive: true
        };
    }
})();