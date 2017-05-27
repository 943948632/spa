(function() {
    'use strict';

    angular
        .module('app.quick-panel')
        .controller('QuickPanelController', QuickPanelController);

    /** @ngInject */
    function QuickPanelController($document, msApi, $http, $scope, $mdDialog) {
        var vm = this;

        // Data
        vm.date = new Date();
        vm.settings = {
            notify: true,
            cloud: false,
            retro: true
        };

        msApi.request('quickPanel.activities@get', {},
            // Success
            function(response) {
                vm.activities = response.data;
            }
        );
        var Token = sessionStorage.getItem("Token");
        // setInterval(function() {
        $http({
            method: "get",
            data: { page: 1, per_page: 20, offset: 0 },
            url: "https://staging.tophold.com/api/v2/products/likes",
            headers: { "Content-Type": "application/json", "X-Access-Token": Token }
        }).success(function(d) {
            vm.events = d.products;


        }).error(function(error) {});
        // }, 2000);


        $scope.dummyFunction = function(ev, task, en_name, current_price) {
            var id = ev;
            console.log(id + "" + task + "" + en_name + "" + current_price);



            $mdDialog.show({
                controller: 'TaskDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/quick-panel/dialogs/task/task-dialog.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    Task: task,
                    Tasks: vm.tasks,
                    event: ev,
                    current_price: current_price

                }

            });
        }

        msApi.request('quickPanel.notes@get', {},
            // Success
            function(response) {
                vm.notes = response.data;
            }
        );
    }

})();